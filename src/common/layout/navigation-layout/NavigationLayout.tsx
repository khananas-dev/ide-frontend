import {
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  NavContainerStyled,
  NavDrawer,
  NavHeaderStyled,
  NavListBox,
} from "./NavigationLayoutStyled";
import "./NavigationLayout.scss";
import { useAppSelector } from "../../store/hooks";
import { DefaultColors } from "../../constants/colors";
import AvatarComponent from "../../../components/avatar/AvatarComponent";
import ProfileDrawer from "./profile-drawer/ProfileDrawer";
import LogoSVG from "../../../assets/images/logos/logo-no-background.png";

export interface NavigationLayoutProps {
  currentPage: "studio-m" | "studio-w" | "studio-k" | "common";
}

export interface IProductModel {
  name: string;
  title: string;
  iconName: "studio-m" | "studio-w" | "studio-k";
  url: string;
  description: string;
}

export default function NavigationLayout(props: NavigationLayoutProps) {
  // Variables
  const navigate = useNavigate();
  // hooks
  const location = useLocation();

  // states
  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState<
    IProductModel | "common"
  >("common");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isSmallDevice, setIsSmallDevice] = React.useState(false);

  // stores
  const { userDetails } = useAppSelector((state: any) => state.auth);

  function getIsNavigationAvailable() {
    return (
      typeof currentProduct === "object" && currentProduct.url === "studio-m"
    );
  }

  // effects

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      if (window.innerWidth < 1000) {
        setIsSmallDevice(true);
        setPinned(false);
        setNavDrawerOpen(false);
      } else {
        setIsSmallDevice(false);
      }
    });
    window.addEventListener("load", (event) => {
      if (window.innerWidth < 1000) {
        setIsSmallDevice(true);
        setPinned(false);
        setNavDrawerOpen(false);
      } else {
        setIsSmallDevice(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
      window.removeEventListener("load", () => {});
    };
  });

  useEffect(() => {
    // on location change
    if (currentProduct != "common") {
      document.title = currentProduct.title;
    } else {
      document.title = "CodeWeb";
    }
  }, [location, currentProduct]);

  // functions

  const handleProfileDrawerOpen = () => {
    setProfileDrawerOpen(true);
  };

  const handleProfileDrawerClose = () => {
    setProfileDrawerOpen(false);
  };

  return (
    <div className="nav-layout">
      <NavHeaderStyled position="sticky">
        <Toolbar>
          <div className="left-items">
            {/* <LogoSVG className="application-logo" /> */}
            <img
              src={LogoSVG}
              className="application-logo"
              style={{ width: "150px", height: "auto", maxWidth: "100%" }}
            />
          </div>
          <div className="right-items">
            <IconButton
              onClick={handleProfileDrawerOpen}
              className="profileToggleBtn"
              size="large"
            >
              <AvatarComponent
                name={userDetails?.firstName + " " + userDetails?.lastName}
              />
            </IconButton>
          </div>
        </Toolbar>
      </NavHeaderStyled>

      <NavContainerStyled
        className={`nav-container ${
          pinned && navDrawerOpen && !isSmallDevice ? "pinned" : ""
        }`}
        isFullView={!getIsNavigationAvailable()}
        isNavOpen={navDrawerOpen}
      >
        <Outlet />
      </NavContainerStyled>
      <Drawer
        anchor={"right"}
        open={profileDrawerOpen}
        onClose={handleProfileDrawerClose}
      >
        <ProfileDrawer onClose={handleProfileDrawerClose} />
      </Drawer>
    </div>
  );
}

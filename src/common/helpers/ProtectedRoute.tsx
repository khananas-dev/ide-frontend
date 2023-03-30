import {
  createTheme,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { lazy, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ModalComponent from "../../components/modal-component/components/ModalComponent";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ReactComponent as LogoSVG } from "../../assets/images/logos/Data_Edge_logo.svg";

// Lazy Route Module
const NavigationLayout = lazy(
  () => import("../layout/navigation-layout/NavigationLayout")
);
export interface NavigationLayoutProps {
  currentPage: "studio-m" | "studio-w" | "studio-k" | "common";
}
const ProtectedRoute = (props: NavigationLayoutProps) => {
  // Store Hook
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { token, loading, error } = useAppSelector((state) => state.auth);

  function getNavigationOnLoaded() {
    // if (themesMap[themeId!]) {
    //   return (
    //     <>
    //       <NavigationLayout {...props} />
    //       <ModalComponent />
    //     </>
    //   );
    // } else {
    //   return (
    //     <div
    //       style={{
    //         height: "100%",
    //         width: "100%",
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       {/* <LogoSVG style={{ width: "200px" }} /> */}
    //       company logo
    //       <br />
    //       <div>Please wait...</div>
    //     </div>
    //   );
    // }
    return (
      <>
        <NavigationLayout {...props} />
        <ModalComponent />
      </>
    );
  }

  return !!token ? (
    getNavigationOnLoaded()
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;

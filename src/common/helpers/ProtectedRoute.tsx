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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#962bb0",
        dark: "#671e9a",
        light: "#f2e5f5",
        contrastText: "#fff",
      },
      error: {
        main: "#ce0019",
      },
      success: {
        main: "#00823b",
      },
      warning: {
        main: "rgba(245, 164, 0, 1)",
      },
    },
  });

  function getNavigationOnLoaded() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <NavigationLayout {...props} />
          <ModalComponent />
        </ThemeProvider>
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

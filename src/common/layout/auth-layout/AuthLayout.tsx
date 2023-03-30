import { Outlet } from "react-router-dom";
import LogoSVG from "../../../assets/images/logos/logo-no-background.png";
import "./AuthLayoutStyle.scss";
import { defaultTheme } from "../../../GlobalTheme";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { AuthLayoutStyled } from "./AuthLayoutStyled";

export default function AuthLayout() {
  // defaultTheme.palette.mode = useMediaQuery("(prefers-color-scheme: light)")
  //   ? "dark"
  //   : "light";
  return (
    <div className="auth-layout">
      <ThemeProvider theme={defaultTheme}>
        <AuthLayoutStyled className="layout-container">
          {defaultTheme.palette.mode === "light" ? (
            // <LogoSVG className="application-logo" />
            <img src={LogoSVG} className="application-logo" />
          ) : (
            // "Comapany logo"
            // <LogoWhiteSVG className="application-logo" />
            "Comapany logo white"
          )}
          <div className="page-outlet">
            <Outlet />
          </div>
        </AuthLayoutStyled>
      </ThemeProvider>
    </div>
  );
}

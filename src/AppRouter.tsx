import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./modules/auth/AuthRoutes";
import ApplicationRoutes from "./modules/ApplicationRoutes";
import LogoSVG from "./assets/images/logos/logo-no-background.png";

export default function AppRouter() {
  const LoadingMessage = () => (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={LogoSVG} style={{ width: "200px" }} />

      <br />
      <div>Please wait...</div>
    </div>
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingMessage />}>
        <Routes>
          {AuthRoutes}
          {ApplicationRoutes}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

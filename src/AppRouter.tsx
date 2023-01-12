import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ApplicationRoutes from "./modules/ApplicationRoutes";

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
      <div>Please wait...</div>
    </div>
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingMessage />}>
        <Routes>{ApplicationRoutes}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

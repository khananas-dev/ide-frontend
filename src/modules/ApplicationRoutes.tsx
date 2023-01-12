import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

// Lazy Route Modules

const CodeStudioComponent = lazy(() => import("./ide/CodeStudio"));

export default (
  <Route path="/">
    {/* Code Component */}
    <Route path="code" element={<CodeStudioComponent />} />
  </Route>
);

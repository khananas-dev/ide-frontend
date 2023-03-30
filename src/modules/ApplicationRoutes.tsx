import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "../common/helpers/ProtectedRoute";

// Lazy Route Modules
const IDEComponent = lazy(() => import("./ide"));

export default (
  <Route path="/">
    <Route index element={<Navigate to="ide/code" />} />
    <Route path="ide" element={<ProtectedRoute currentPage="common" />}>
      <Route path="code" element={<IDEComponent />} />
    </Route>
  </Route>
);

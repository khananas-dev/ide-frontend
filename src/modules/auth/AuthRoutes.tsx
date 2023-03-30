import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

// Lazy Route Modules
const AuthLayout = lazy(
  () => import("../../common/layout/auth-layout/AuthLayout")
);
const LoginPage = lazy(() => import("./pages/login/Login"));
const SignupPage = lazy(() => import("./pages/login/SignUp"));
const ForgotPasswordPage = lazy(
  () => import("./pages/forgot-password/ForgotPassword")
);
const ResetPasswordPage = lazy(() => import("./pages/reset-password"));

export default (
  <Route path="/auth" element={<AuthLayout />}>
    <Route path="" element={<Navigate to="login" />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
    {/* <Route path="forgot-password" element={<ForgotPasswordPage />} />
    <Route path="reset-password" element={<ResetPasswordPage />} /> */}
  </Route>
);

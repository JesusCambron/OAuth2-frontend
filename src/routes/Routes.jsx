import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import OauthPage from "../pages/OauthPage";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import VerifyAccount from "../pages/VerifyAccount";
import ResendToken from "../pages/ResendToken";
import CheckYourEmail from "../pages/CheckYourEmail";

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*">
      <Route path="oauth" element={<OauthPage />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="home" element={<Home />} />
      </Route>
      <Route path="check-your-email" element={<CheckYourEmail />} />
      <Route path="verify-account/:id/:token" element={<VerifyAccount />} />
      <Route path="resend-token" element={<ResendToken />} />
      <Route path="*" element={<Navigate to="/home" replace={true} />} />
    </Route>
  )
);
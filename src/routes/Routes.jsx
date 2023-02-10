import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import OauthPage from "../pages/OauthPage";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoute />}>
        <Route index path="home" element={<Home />} />
      </Route>
      <Route path="oauth" element={<OauthPage />}>
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Route>
  )
);
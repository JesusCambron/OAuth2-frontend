import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../pages/Login";
import OauthPage from "../pages/OauthPage";
import Signup from "../pages/Signup";
/*  */
export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/oauth" element={<OauthPage />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);
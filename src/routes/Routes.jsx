import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Login />} />
  )
);
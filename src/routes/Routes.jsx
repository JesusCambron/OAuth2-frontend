import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../pages/Login";

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Login />} />
  )
);
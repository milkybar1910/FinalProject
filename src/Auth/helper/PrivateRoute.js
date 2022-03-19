import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from ".";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default PrivateRoute;

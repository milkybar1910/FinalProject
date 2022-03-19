import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from ".";

const AdminRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() && isAuthenticated().student.role === 1 ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default AdminRoute;

import React from "react";
import { useSelector } from "react-redux";
import NotFound from "./Pages/NotFound";

const ProtectedRoute = ({ children, permission}) => {
  const role = useSelector((state) => state.AuthSlice.Role);

  if (role !== permission) {
    return <NotFound />;
  }
  return children;
};

export default ProtectedRoute;

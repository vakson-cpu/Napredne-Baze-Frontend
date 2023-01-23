import React from "react";
import { useSelector } from "react-redux";
import NotFound from "./Pages/NotFound";

const ProtectedRoute = ({ children, permission}) => {
  console.log(permission)
  const role = useSelector((state) => state.AuthSlice.Role);
  
  if (!permission.includes(role)) {
    return <NotFound />;
  }
  return children;
};

export default ProtectedRoute;

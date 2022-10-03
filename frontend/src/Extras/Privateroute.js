import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // change true with is login redux
  return userInfo ? children : <Navigate to="/" />;
}

export default PrivateRoute;

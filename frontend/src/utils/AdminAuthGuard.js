import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context";
import jwt_decode from "jwt-decode";

const AdminAuthGuard = ({ children }) => {
  const [user, setUser] = useContext(UserContext);

  // useEffect(() => {
  //   console.log(user);

  //   return () => {};
  // }, [user]);
  // console.log(user.isLoggedIn);
  return user.isLoggedIn === true && user.isAdmin === true ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminAuthGuard;

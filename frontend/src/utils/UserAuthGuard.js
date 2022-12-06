import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context";
import jwt_decode from "jwt-decode";

const UserAuthGuard = ({ children }) => {
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const resData = jwt_decode(localStorage.getItem("token"));
      setUser({ ...resData, isLoggedIn: true });
    } else {
      // setUser({ ...resData, isLoggedIn: true });
      console.log("++++++++++++++++++++++");
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log(user);

    return () => {};
  }, [user]);
  console.log(user.isLoggedIn);
  return user.isLoggedIn === true && !user.isAdmin ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default UserAuthGuard;

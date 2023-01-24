import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();
export const Context = ({ children }) => {
  const initialValue = {
    name: "",
    email: "",
    isLoggedIn: false,
  };
  const [user, setUser] = useState(() => {
    try {
      // Get from local storage by key
      const item = jwt_decode(localStorage.getItem("token"));
      // Parse stored json or if none return initialValue
      return item ? item : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // Get from local storage by key
      const item = jwt_decode(localStorage.getItem("token"));
      // Parse stored json or if none return initialValue
      let currentState = {};
      if (item) {
        currentState = { ...item, isLoggedIn: true };
      } else {
        currentState = { ...initialValue, isLoggedIn: false };
      }
      setUser(currentState);
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      setUser(() => initialValue);
    }
    // return () => {};
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {/* {console.log(user)} */}
      {children}
    </UserContext.Provider>
  );
};

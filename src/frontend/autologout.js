import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

const AutoLogoutHandler = ({ children }) => {
  const dispatch = useDispatch();
  const expiryDate = useSelector((state) => state.auth.expiryDate);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = new Date().getTime();
      const expiryTime = new Date(expiryDate).getTime();

      if (expiryTime <= currentTime) {
        dispatch(authActions.logout());
        // Perform any additional actions like redirecting to the login page
        // or clearing local storage
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000);

    // Check if a token exists in local storage and dispatch the login action
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const storedExpiryDate = localStorage.getItem("expiryDate");
    const type = localStorage.getItem("type");

    if (token && userId && storedExpiryDate) {
      dispatch(
        authActions.login({
          token: token,
          userID: userId,
          type: type, // Add the appropriate value for the 'type' property
        })
      );
      dispatch(authActions.setExpiryDate(storedExpiryDate));
    }

    return () => {
      clearInterval(interval);
    };
  }, [expiryDate, dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AutoLogoutHandler;

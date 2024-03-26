import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useCookies } from "react-cookie";
import { refreshTokenAction } from "../../apiCalls/oauth2/refreshTokenAction";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import { logoutAction } from "../../actions/userActions";

const SessionManagement: any = ({ children }: any) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "logoutTime", "refresh-token"]);
  const [logoutTime, setLogoutTime] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cookies.user) {
      const userFromCookie: GoogleDataJson = cookies.user;
      const userTokenDecoded: DecodedJwtToken = jwt_decode(userFromCookie.id_token);
      try {
        setLogoutTime(userTokenDecoded.exp);
        setCookie("logoutTime", userTokenDecoded.exp, { path: "/" });
      } catch (error) {
        console.error("Failed to decode token or set logout time: ", error);
      }
    }
  }, [cookies.user, setCookie]);
  
  useEffect(() => {
    const storedLogoutTime = cookies.logoutTime ? Number(cookies.logoutTime) : 0;
    if (storedLogoutTime) {
      setLogoutTime(storedLogoutTime);
    }
  }, [cookies.logoutTime]);


  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      console.log("Time Remaining: " + (logoutTime - currentTime))

      if (logoutTime - currentTime <= 100 && cookies.user) {
        let userFromCookie: GoogleDataJson = cookies.user;

        if (!userFromCookie || !userFromCookie.refresh_token) {
          userFromCookie = {
            ...userFromCookie,
            refresh_token: cookies["refresh-token"],
          };
        }
        // debugger;
        dispatch(refreshTokenAction(userFromCookie))
          .unwrap()
          .then((response: GoogleDataJson ) => {
            const newDecodedToken: DecodedJwtToken = jwt_decode(response.id_token);
            setLogoutTime(newDecodedToken.exp);
            setCookie("user", response, { path: '/' });
          })
          .catch(() => {
            dispatch(logoutAction());
            removeCookie("user");
            window.location.href = '/';
          });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [logoutTime, dispatch, setCookie, removeCookie]);

  return (
    <>
      {/* {showSnackbarInfo && cookies.user && (
        <SnackbarInfo message="Your session will automatically expire in 5 minutes." />
      )}
      {showSnackbarWarning && cookies.user && (
        <SnackbarWarning message="Your session will automatically expire in 2 minutes. Please log back in as progress will not be saved." />
      )} */}
      {children}
    </>
  );
};

export default SessionManagement;

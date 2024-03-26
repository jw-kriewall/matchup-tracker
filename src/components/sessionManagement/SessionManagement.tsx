import React, { useEffect, useState } from "react";
import SnackbarInfo from "../snackbarNotifications/SnackbarInfo";
import SnackbarWarning from "../snackbarNotifications/SnackbarWarning";
import { useAppDispatch } from "../../hooks/hooks";
import { logoutAction } from "../../actions/userActions";
import { useCookies } from "react-cookie";
import { refreshTokenAction } from "../../apiCalls/oauth2/refreshTokenAction";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";

const SessionManagement: any = ({ children }: any) => {
  const [showSnackbarInfo, setShowSnackbarInfo] = useState(false);
  const [showSnackbarWarning, setShowSnackbarWarning] = useState(false);
  const [infoShown, setInfoShown] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const [logoutTime, setLogoutTime] = useState<number>(0);
  const user = cookies["user"];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const userDecoded: DecodedJwtToken = (user);
      try {
        setLogoutTime(userDecoded.exp);
      } catch (error) {
        console.error("Failed to decode token or set logout time:", error);
      }
    }
  }, [user]);


  useEffect(() => {
    if (logoutTime > 0 && user) {
      const checkTime = () => {
        const currentTime = new Date().getTime() / 1000 + 3490;
        const fiveMinutesBeforeLogout = currentTime - 20;
        const twoMinutesBeforeLogout = logoutTime - 10;

        console.log("Logout Time " + logoutTime)
        console.log("currentTime " + currentTime)

        if (
          currentTime >= fiveMinutesBeforeLogout &&
          currentTime < twoMinutesBeforeLogout &&
          user &&
          !infoShown &&
          !warningShown
        ) {
          setShowSnackbarInfo(true);
          setInfoShown(true);
          console.log("Info Shown");
        }

        if (
          currentTime >= twoMinutesBeforeLogout &&
          currentTime < logoutTime &&
          user &&
          infoShown &&
          !warningShown
        ) 
        {
          dispatch(refreshTokenAction(user.refresh_token))
          .unwrap()
          .then((newData) => {
            setCookie("user", newData.decodedToken, { path: "/" });
            setWarningShown(false); // Hide warning once the token is refreshed
            setLogoutTime(newData.decodedToken.exp);
            // Optionally, update expiryTime in your state or cookies
            // setCookie("user", { ...cookies.user, expiryTime: newData.expiryTime }, { path: "/" });
          })
          .catch(() => {
            dispatch(logoutAction());
            window.location.href = "/";
          });
          // refreshToken(user);
          setShowSnackbarWarning(true);
          setWarningShown(true);
          console.log("Warning Shown");
        }

        if (currentTime >= logoutTime && infoShown && warningShown && user) {
          //@TODO: Check this...
          setInfoShown(false);
          setWarningShown(false);
          dispatch(logoutAction());
          window.location.href = "/";
        }
      };
      const interval = setInterval(checkTime, 1000);
      return () => clearInterval(interval);
    }
  }, [logoutTime, infoShown, warningShown, dispatch, user]);

  return (
    <>
      {showSnackbarInfo && user && (
        <SnackbarInfo message="Your session will automatically expire in 5 minutes." />
      )}
      {showSnackbarWarning && user && (
        <SnackbarWarning message="Your session will automatically expire in 2 minutes. Please log back in as progress will not be saved." />
      )}
      {children}
    </>
  );
};

export default SessionManagement;

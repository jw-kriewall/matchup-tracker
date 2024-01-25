import React, { useEffect, useState } from "react";
import SnackbarInfo from "../snackbarNotifications/SnackbarInfo";
import SnackbarWarning from "../snackbarNotifications/SnackbarWarning";
import { useAppDispatch } from "../../hooks/hooks";
import { logoutAction } from "../../actions/userActions";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";

const SessionManagement: any = ({ children }: any) => {
  const [showSnackbarInfo, setShowSnackbarInfo] = useState(false);
  const [showSnackbarWarning, setShowSnackbarWarning] = useState(false);
  const [infoShown, setInfoShown] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const [cookies] = useCookies(["user"]);

  const user = cookies["user"]?.payload;
  let logoutTime: number = 0;

  if (user) {
    try {
      const decodedToken: DecodedJwtToken = jwt_decode(user.credential);
      logoutTime = decodedToken.exp;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  } else {
    console.log("No user token found");
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (logoutTime !== undefined && user) {
      console.log(logoutTime);
      const checkTime = () => {
        const currentTime = new Date().getTime() / 1000;
        console.log(logoutTime - currentTime);
        const fiveMinutesBeforeLogout = logoutTime - 5 * 60 * 1000;
        const twoMinutesBeforeLogout = logoutTime - 2 * 60 * 1000;

        if (
          currentTime <= fiveMinutesBeforeLogout &&
          currentTime > twoMinutesBeforeLogout &&
          !infoShown
        ) {
          setShowSnackbarInfo(true);
          setInfoShown(true);
        }

        if (
          currentTime <= twoMinutesBeforeLogout &&
          currentTime > logoutTime &&
          !warningShown
        ) {
          setShowSnackbarWarning(true);
          setWarningShown(true);
        }

        if (currentTime >= logoutTime && infoShown && warningShown && user) {
          //@TODO: Check this...
          setShowSnackbarInfo(false);
          setShowSnackbarWarning(false);
          setInfoShown(false);
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

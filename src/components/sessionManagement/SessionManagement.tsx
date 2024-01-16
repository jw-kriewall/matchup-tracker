import React, { useEffect, useState } from 'react';
import SnackbarInfo from '../snackbarNotifications/SnackbarInfo';
import useUserLogout from '../../hooks/userLogoutHook';
import SnackbarWarning from '../snackbarNotifications/SnackbarWarning';
import { useAppDispatch } from '../../hooks/hooks';
import { logoutAction } from '../../actions/userActions';
import { useCookies } from 'react-cookie';

const SessionManagement: any = ({ children }: any) => {
  const [showSnackbarInfo, setShowSnackbarInfo] = useState(false);
  const [showSnackbarWarning, setShowSnackbarWarning] = useState(false);
  const [infoShown, setInfoShown] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const [cookies] = useCookies(["user"]);
  
  const user = cookies["user"]?.payload;
  const logoutTime = useUserLogout()?.getTime();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (logoutTime && user) {
      const checkTime = () => {
        const currentTime = new Date().getTime();
        const fiveMinutesBeforeLogout = logoutTime - 5 * 60 * 1000;
        const twoMinutesBeforeLogout = logoutTime - 2 * 60 * 1000;

        if (currentTime >= fiveMinutesBeforeLogout && currentTime < twoMinutesBeforeLogout && !infoShown) {
          setShowSnackbarInfo(true);
          setInfoShown(true);
        }

        if (currentTime >= twoMinutesBeforeLogout && currentTime < logoutTime && !warningShown) {
          setShowSnackbarWarning(true);
          setWarningShown(true);
        }

        if (currentTime >= logoutTime && infoShown && warningShown && user) {
          //@TODO: Check this...
          dispatch(logoutAction());
          window.location.href = "/";
        }
      };
      const interval = setInterval(checkTime, 1000)
      return () => clearInterval(interval);
    }
  }, [logoutTime, infoShown, warningShown, dispatch, user]);

  return (
    <>
      {showSnackbarInfo && user && <SnackbarInfo message="Your session will automatically expire in 5 minutes." />}
      {showSnackbarWarning && user && <SnackbarWarning message="Your session will automatically expire in 2 minutes. Please log back in as progress will not be saved." />}
      {children}
    </>
  );
};

export default SessionManagement;

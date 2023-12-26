import React, { useEffect, useState } from 'react';
import SnackbarInfo from '../snackbarNotifications/SnackbarInfo';
import useUserLogout from '../../hooks/userLogoutHook';
import useUser from '../../hooks/userHook';

const SessionManagement = ({ children }: any) => {
  const user = useUser();
  const logoutTime = useUserLogout()?.getTime();
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (logoutTime) {
      const checkTime = () => {
        const currentTime = new Date().getTime();
        const fiveMinutesBeforeLogout = logoutTime - 5 * 60 * 1000;

        if (currentTime >= fiveMinutesBeforeLogout && currentTime < logoutTime) {
          setShowSnackbar(true);
        }
      };
      //@TODO: can also implement logout logic here I think...

      const interval = setInterval(checkTime, 1000);
      return () => clearInterval(interval);
    }
  }, [logoutTime]);

  return (
    <>
      {showSnackbar && user && <SnackbarInfo message="Your session will automatically expire in 5 minutes" />}
      {children}
    </>
  );
};

export default SessionManagement;

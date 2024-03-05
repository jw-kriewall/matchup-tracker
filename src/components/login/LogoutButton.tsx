import React from "react";
import { Button } from "@mui/material";
import { logoutAction } from "../../actions/userActions";
import { useAppDispatch } from "../../hooks/hooks";
import { useCookies } from 'react-cookie';

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const [, removeCookie] = useCookies(['userRole']);
  const [, removeUserCookie] = useCookies(['user']);
  
  const handleLogout = () => {
    removeUserCookie('user', { path: '/' });
    removeCookie('userRole', { path: '/' });
    dispatch(logoutAction());
    // @TODO: should I be doing something different here?
    window.location.reload();
  };

  return (
    <Button color="inherit" onClick={() => handleLogout()}>
      Logout
    </Button>
  );
}

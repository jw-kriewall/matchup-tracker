import React from "react";
import { MenuItem } from "@mui/material";
import { logoutAction } from "../../actions/userActions";
import { useAppDispatch } from "../../hooks/hooks";
import { useCookies } from 'react-cookie';

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const [, , removeCookie] = useCookies(['user', 'userRole']);
  
  const handleLogout = () => {
    removeCookie('user', { path: '/' });
    removeCookie('userRole', { path: '/' });
    dispatch(logoutAction());
    // Optional: Consider using a more React-friendly navigation method if possible
    window.location.reload(); // This reloads the page, which might be fine depending on your use case
  };

  return (
    <MenuItem color="inherit" onClick={() => handleLogout()}>
      Logout
    </MenuItem>
  );
}

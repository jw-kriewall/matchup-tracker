import { Menu, MenuItem } from "@mui/material";
import LogoutButton from "../login/LogoutButton";
import React from "react";

export function ChangeFormatButton() {
    
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    
    return (
        <>
            "Hello!"
        </>
    );
}
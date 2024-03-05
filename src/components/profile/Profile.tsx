import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import XIcon from "@mui/icons-material/X";
import LogoutButton from "../login/LogoutButton";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import React from "react";

export function Profile() {
	const [userCookies] = useCookies(["user"]);
	const user: CredentialResponse = userCookies["user"]?.payload;
	let userPicture = "";

	if (user && user.credential) {
		let decodedToken: DecodedJwtToken | null = null;
		decodedToken = jwt_decode<DecodedJwtToken>(user.credential);

		userPicture = decodedToken.picture;
	}

	const handleClick = () => {
		console.log(userPicture);
	};

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

	return (
		// <>
		// 	<IconButton onClick={handleClick}>
        //         <Avatar alt="User Pic" src={userPicture}/>
		// 	</IconButton>
		// </>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userPicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <LogoutButton />
            </Menu>
          </Box>
	);
}


{/* <LogoutButton /> */}

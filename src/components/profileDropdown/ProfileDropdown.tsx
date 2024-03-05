import {
	Avatar,
	Box,
	Collapse,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
} from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import LogoutButton from "../login/LogoutButton";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export function ProfileDropdown() {
	const [userCookies] = useCookies(["user"]);
	const user: CredentialResponse = userCookies["user"]?.payload;
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
	let userPicture = "";

	if (user && user.credential) {
		let decodedToken: DecodedJwtToken | null = null;
		decodedToken = jwt_decode<DecodedJwtToken>(user.credential);

		userPicture = decodedToken.picture;
	}

	const handleClick = () => {
		setOpen(!open);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
		setOpen(false);
	};

  const handleFormatOnClick = (format: string) => {
    // when this button is clicked, what should happen?

    // API call to fetch data based on user email and format.
    // Each matchup should have a format that can be searched by
    // Send format + email to backend to fetch new data.
    // Make sure feed refreshes
    // Format could be shown on screen?
    // Format needs to be made a global variable so that proper dropdown menu can be adjusted.
    
    console.log(format);
  }

	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Profile settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt="Profile Pic" src={userPicture} />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<List
					sx={{ width: "100%", maxWidth: 360, minWidth: 200, bgcolor: "background.paper" }}
					component="nav"
					aria-labelledby="nested-list-subheader"
				>
					<ListItemButton onClick={handleClick}>
						<ListItemText primary="Format" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>

					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton sx={{ pl: 4 }} onClick={() => handleFormatOnClick("F-on")}>
								<ListItemText primary="Standard" />
							</ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={() => handleFormatOnClick("GLC")}>
								<ListItemText primary="GLC" />
							</ListItemButton>
						</List>
					</Collapse>
				</List>

				<MenuItem>
					<LogoutButton />
				</MenuItem>
			</Menu>
		</Box>
	);
}

import {
	Avatar,
	Box,
	Collapse,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Menu,
	Tooltip,
} from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import LogoutButton from "../login/LogoutButton";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/hooks";
import { getMatchups } from "../../apiCalls/matchups/getMatchups";
import { GoogleDataJson } from "../../types/GoogleDataJson";

export function ProfileDropdown() {
	const [userCookies] = useCookies(["user"]);
	const user: GoogleDataJson = userCookies["user"];
  	const [open, setOpen] = React.useState(false);
  	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
  	);
	let userPicture = "";
  	const [cookies, setCookie] = useCookies(["userRole", "user", "format"]);
  	const dispatch = useAppDispatch();
	  
	  if (user && user.id_token) {
		  let decodedToken: DecodedJwtToken | null = null;
		  decodedToken = jwt_decode<DecodedJwtToken>(user.id_token);
		  
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
    setCookie("format", format, { path: "/", maxAge: 3600 * 24 * 30 });
    dispatch(getMatchups({ user: cookies.user.payload, format: format }));
    // setOpen(false);
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
							<ListItemButton selected={cookies.format === "BRS-TEF"} sx={{ pl: 4 }} onClick={() => handleFormatOnClick("BRS-TEF")}>
								<ListItemText primary="BRS-TEF (Standard)" />
							</ListItemButton>

              				<ListItemButton selected={cookies.format === "GLC"} sx={{ pl: 4 }} onClick={() => handleFormatOnClick("GLC")}>
								<ListItemText primary="GLC" />
							</ListItemButton>
						</List>
					</Collapse>
				</List>

				<LogoutButton />
			</Menu>
		</Box>
	);
}

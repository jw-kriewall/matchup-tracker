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
	Typography,
} from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import LogoutButton from "../login/LogoutButton";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import React from "react";
import { ChangeFormatButton } from "../changeFormat/ChangeFormatButton";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export function ProfileDropdown() {
	const [userCookies] = useCookies(["user"]);
	const user: CredentialResponse = userCookies["user"]?.payload;
	let userPicture = "";

	if (user && user.credential) {
		let decodedToken: DecodedJwtToken | null = null;
		decodedToken = jwt_decode<DecodedJwtToken>(user.credential);

		userPicture = decodedToken.picture;
	}

	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
		setOpen(false);
	};

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
					sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
					component="nav"
					aria-labelledby="nested-list-subheader"
				>
					<ListItemButton onClick={handleClick}>
						<ListItemText primary="Inbox" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemText primary="Starred" />
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

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
import { useCookies } from "react-cookie";
import LogoutButton from "../login/LogoutButton";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/hooks";
import { getMatchups } from "../../apiCalls/matchups/getMatchups";
import ModifyDeckDisplay from "../modifyDeckDisplay/ModifyDeckDisplay";

export function ProfileDropdown() {
	const [open, setOpen] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);
	const [cookies, setCookie] = useCookies(["userRole", "user", "format"]);
	const dispatch = useAppDispatch();
	let userPicture = "";

	if (cookies.user) {
		const jwtToken: string = cookies.user;
		const decodedUserToken: DecodedJwtToken = jwt_decode(jwtToken);
		userPicture = decodedUserToken.picture;
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
		dispatch(getMatchups({ userToken: cookies.user, format: format }));
		// setOpen(false);
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
					sx={{
						width: "100%",
						maxWidth: 360,
						minWidth: 200,
						bgcolor: "background.paper",
						paddingBottom: "0px",
						paddingTop: "0px"
					}}
					component="nav"
					aria-labelledby="nested-list-subheader"
				>
					{/* @TODO: Fix padding on menu dropdown - i.e. remove sx in listItemButton below */}
					<ListItemButton onClick={handleClick} sx={{ paddingBottom: '2px' }}>
						<ListItemText primary="Format" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>

					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton
								selected={cookies.format === "BRS-SCR"}
								sx={{ pl: 4 }}
								onClick={() => handleFormatOnClick("BRS-SCR")}
							>
								<ListItemText primary="BRS-SCR" />
							</ListItemButton>

							<ListItemButton
								selected={cookies.format === "BRS-TWM"}
								sx={{ pl: 4 }}
								onClick={() => handleFormatOnClick("BRS-TWM")}
							>
								<ListItemText primary="BRS-TWM" />
							</ListItemButton>

							<ListItemButton
								selected={cookies.format === "BRS-TEF"}
								sx={{ pl: 4 }}
								onClick={() => handleFormatOnClick("BRS-TEF")}
							>
								<ListItemText primary="BRS-TEF" />
							</ListItemButton>

							<ListItemButton
								selected={cookies.format === "GLC"}
								sx={{ pl: 4 }}
								onClick={() => handleFormatOnClick("GLC")}
							>
								<ListItemText primary="GLC" />
							</ListItemButton>
						</List>
					</Collapse>
				</List>

				<ModifyDeckDisplay />

				<LogoutButton />
			</Menu>
		</Box>
	);
}

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import LoginButton from "../login/LoginButton";
import LogoutButton from "../login/LogoutButton";
import { useCookies } from "react-cookie";
import { CredentialResponse } from "@react-oauth/google";

export default function NavBar() {
	const [userCookies] = useCookies(["user"]);
  	const user: CredentialResponse = userCookies["user"]?.payload;
	const [drawerOpen, setDrawerOpen] = React.useState(false);
	const navigate = useNavigate();

	const toggleDrawer = (open: any) => (event: any) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setDrawerOpen(open);
	};

	const handleNavigation = (path: string) => {
		navigate(path);
		setDrawerOpen(false);
	};

	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation("/")}>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation("/data")}>
						<ListItemText primary="Data" />
					</ListItemButton>
				</ListItem>
				{/* Add more ListItems here for additional pages */}
			</List>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 4 }}
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>

					<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
						{list()}
					</Drawer>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						MatchupTracker v1.0 BETA
					</Typography>

					<div>{!user ? <LoginButton /> : <LogoutButton />}</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

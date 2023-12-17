import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../hooks/hooks";
import LogoutButton from "./login/LogoutButton";
import LoginButton from "./login/LoginButton";

export default function NavBar() {
	const user = useAppSelector(state => state.userReducer.user);
	
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 4 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							MatchupTracker v1.0
						</Typography>

						<div>
							{ !user ? <LoginButton/> : <LogoutButton/> }
						</div>
						
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}

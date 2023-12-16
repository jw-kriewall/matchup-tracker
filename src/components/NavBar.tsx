import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import LoginPage from "../components/login/LoginPage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logoutAction } from "../actions/userActions";
import { resetMatchups } from "../actions/matchupActions";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 360,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function NavBar() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const user = useAppSelector(state => state.userReducer.user);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		console.log("handle logout")
		dispatch(logoutAction())
		dispatch(resetMatchups())
	}
	
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

						{ !user ? (		
							<Button color="inherit" onClick={handleOpen}>
								Login
							</Button>
							) : 
							<Button color="inherit" onClick={() => handleLogout()}>
								Logout
							</Button>
						}
						</div>
						
					</Toolbar>
				</AppBar>
			</Box>

			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<LoginPage/>
					</Box>
				</Modal>
			</div>
		</>
	);
}

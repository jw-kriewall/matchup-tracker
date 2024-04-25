import React, { useState } from "react";
import {
	MenuItem,
	Modal,
	Box,
	Typography,
	List,
	ListItem,
	Tabs,
	Tab,
	IconButton,
} from "@mui/material";
import { createDeckDisplay } from "../../apiCalls/deckDisplay/createDeckDisplay";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useCookies } from "react-cookie";
import { DeckDisplayForm } from "./AddDeckForm";
import { DeckDisplay } from "../../types/MatchupModels";
import CloseIcon from "@mui/icons-material/Close";
import { deleteDeckDisplay } from "../../apiCalls/deckDisplay/deleteDeckDisplay";

export default function ModifyDeckDisplay() {
	const [open, setOpen] = useState(false);
	const deckDisplays = useAppSelector(
		(state) => state.deckDisplayReducer.deckDisplay
	);
	const [cookies] = useCookies(["userRole", "user", "format"]);
	const [value, setValue] = React.useState(0);
	const dispatch = useAppDispatch();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleFormSubmit = (newDeckDisplay: DeckDisplay) => {
		dispatch(
			createDeckDisplay({
				userToken: cookies.user,
				deckDisplay: newDeckDisplay,
			})
		);
		// handleClose();
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleDelete = (id?: number) => {
		if (!id) {
			console.error("ID is undefined, cannot delete Deck Display");
			return;
		}
		try {
			dispatch(deleteDeckDisplay({userToken: cookies.user, id}));
		}
		catch {
			console.error("Error deleting user's Deck Display")
		}
	};

	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}

	function CustomTabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	return (
		<>
			<MenuItem onClick={handleOpen}>Your Decks</MenuItem>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box sx={style}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={value}
							onChange={handleTabChange}
							aria-label="deck-tabs"
							centered
						>
							<Tab label="Your Decks" />
							<Tab label="Add Deck" />
						</Tabs>
					</Box>
					<CustomTabPanel value={value} index={0}>
						<List>
							{deckDisplays.map((deckDisplay, index) => (
								<ListItem
									key={index}
									secondaryAction={
										<IconButton
											edge="start"
											onClick={() => handleDelete(deckDisplay?.id)}
											aria-label="delete"
										>
											<CloseIcon sx={{ color: "red" }} />
										</IconButton>
									}
								>
									{deckDisplay.label}
								</ListItem>
							))}
						</List>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={1}>
						<DeckDisplayForm onSubmit={handleFormSubmit} />
					</CustomTabPanel>
				</Box>
			</Modal>
		</>
	);
}

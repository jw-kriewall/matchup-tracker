import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { decks } from "../../constants/decks";
import Button from "@mui/material/Button";
import AccordionMatchup from "./AccordionMatchup";
import { DeckDisplay, Matchup } from "../../types/MatchupModels";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import { useDispatch } from "react-redux";
import { addNewMatchup } from "../../apiCalls/addMatchup";
import { AppDispatch } from "../../data/store";
import { IconButton } from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import LooksOneIcon from "@mui/icons-material/LooksOne";

export default function MatchupForm() {
	const [playerOneName, setPlayerOneName] = React.useState<string>("");
	const [playerTwoName, setPlayerTwoName] = React.useState<string>("");
	const [playerOneDeckName, setPlayerOneDeckName] = React.useState<string>("");
	const [playerTwoDeckName, setPlayerTwoDeckName] = React.useState<string>("");
	const [playerOneDecklist, setPlayerOneDecklist] =
		React.useState<string>("blank");
	const [playerTwoDecklist, setPlayerTwoDecklist] =
		React.useState<string>("blank");

	const [startingPlayer, setStartingPlayer] = React.useState<string>("");
	const [winningDeck, setWinningDeck] = React.useState<string>("");
	const [format, setFormat] = React.useState<string>("");
	const [notes, setNotes] = React.useState<string>("");

	const [winningDeckOptionsArray, setWinningDeckOptionsArray] = React.useState<
		string[]
	>([]);

	// @TODO: Delete needs to occur automatically.

	// TODO: can this be useAppDispatch?
	const dispatch = useDispatch<AppDispatch>();

	const handlePlayerOneDeckChange = (e: any) => {
		e.preventDefault();
		let deckName = e.target.value;
		setPlayerOneDeckName(deckName);
		determineWinningDeckOptions(deckName, playerTwoDeckName);
	};
	const handlePlayerTwoDeckChange = (e: any) => {
		e.preventDefault();
		let deckName = e.target.value;
		setPlayerTwoDeckName(deckName);
		determineWinningDeckOptions(deckName, playerOneDeckName);
	};
	const handleSetStartingPlayer = (playerName: string) => {
		setStartingPlayer(playerName);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		let role = "basic";
		let username = "";
		let email = "";

		let oauth: CredentialResponse = JSON.parse(localStorage.getItem("user")!);
		let token = oauth.credential;

		if (token) {
			try {
				const decodedToken: DecodedJwtToken = jwt_decode(token);
				email = decodedToken.email;
				username = decodedToken.name;
			} catch (error) {
				console.error("Error decoding JWT: ", error);
			}
		}

		const matchup: Matchup = {
			// matchup schema goes here...
			id: undefined,
			playerOneName,
			playerOneDeck: {
				name: playerOneDeckName,
				cards: playerOneDecklist,
			},
			playerTwoName,
			playerTwoDeck: {
				name: playerTwoDeckName,
				cards: playerTwoDecklist,
			},
			startingPlayer,
			winningDeck,
			format,
			createdOn: new Date(),
			createdBy: {
				username: username,
				role: role,
				email: email,
			},
			notes,
		};

		console.log(matchup);

		dispatch(addNewMatchup(matchup));
		setNotes("");
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
					<Box
						sx={{
							position: "relative",
							display: "inline-flex",
							width: "auto",
							alignItems: "center",
						}}
					>
						<TextField
							id="outlined-multiline-flexible"
							label="Player One"
							multiline
							value={playerOneName}
							onChange={(e) => setPlayerOneName(e.target.value)}
							sx={{ width: "25ch" }}
						/>
						<IconButton
							onClick={() => handleSetStartingPlayer(playerOneName)}
							aria-label="set-starting-player-button"
							sx={{ position: "absolute", right: -48 }}
							color={
								startingPlayer && startingPlayer === playerOneName
									? "primary"
									: "default"
							}
						>
							<LooksOneIcon />
						</IconButton>
					</Box>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
					<Box
						sx={{
							position: "relative",
							display: "inline-flex",
							width: "auto",
							alignItems: "center",
						}}
					>
						<TextField
							id="outlined-multiline-flexible"
							label="Player Two"
							multiline
							value={playerTwoName}
							onChange={(e) => setPlayerTwoName(e.target.value)}
							sx={{ width: "25ch" }}
						/>
						<IconButton
							onClick={() => handleSetStartingPlayer(playerTwoName)}
							aria-label="set-starting-player-button"
							sx={{ position: "absolute", right: -48 }}
							color={
								startingPlayer && startingPlayer === playerTwoName
									? "primary"
									: "default"
							}
						>
							<LooksOneIcon />
						</IconButton>
					</Box>
				</Box>
			</div>

			<div>
				<TextField
					id="outlined-deck-one"
					select
					label="Player One Deck"
					defaultValue=""
					onChange={(e) => handlePlayerOneDeckChange(e)}
				>
					{decks.map((option: DeckDisplay) => (
						<MenuItem key={option.value} value={option.value}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
							{option.label}
								<Box sx={{ display: "flex" }}>
									{option.sprites.map((sprite, index) => (
										<img
										key={index}
										src={sprite}
										alt={option.label}
										style={{ width: "36px", height: "36px", marginLeft: "2px" }}
										/>
									))}
								</Box>
							</Box>
						</MenuItem>
					))}
				</TextField>

				<TextField
					id="outlined-deck-two"
					select
					label="Player Two Deck"
					defaultValue=""
					onChange={(e) => handlePlayerTwoDeckChange(e)}
				>
					{decks.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								{option.label}
								<Box sx={{ display: "flex" }}>
									{option.sprites.map((sprite, index) => (
										<img
										key={index}
										src={sprite}
										alt={option.label}
										style={{ width: "36px", height: "36px", marginLeft: "2px" }}
										/>
									))}
								</Box>
							</Box>
						</MenuItem>
					))}
				</TextField>
			</div>

			<div>
				<TextField
					id="winning-deck"
					select
					label="Winning Deck"
					defaultValue=""
					onChange={(e) => setWinningDeck(e.target.value)}
				>
					{winningDeckOptionsArray.map((option) => (
						// @TODO: sprites here? Should I pass deck back?
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</div>

			<div className="notes-form">
				<TextField
					id="outlined-multiline-static"
					label="Notes"
					multiline
					rows={3}
					value={notes}
					fullWidth={true}
					onChange={(e) => setNotes(e.target.value)}
				/>
			</div>
			<Button variant="outlined" onClick={handleSubmit}>
				Submit
			</Button>
			<div className="accordion-matchup-component">
				{/* show last 10 matchups with option to show all in second screen. Linked to which user created it */}
				<AccordionMatchup />
			</div>
		</Box>
	);

	function determineWinningDeckOptions(deckName: string, playerDeckName: string) {
		if (deckName === playerDeckName) {
			setWinningDeckOptionsArray([deckName]);
		} else {
			setWinningDeckOptionsArray([playerDeckName, deckName]);
		}
	}
}

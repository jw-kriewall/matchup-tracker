import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ALL_DECKS_CONSTANT } from "../../../constants/allDecks";
import Button from "@mui/material/Button";
import AccordionMatchup from "../accordionMatchup/AccordionMatchup";
import { DeckDisplay, Matchup } from "../../../types/MatchupModels";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../../types/DecodedJwtToken";
import { addNewMatchup } from "../../../apiCalls/matchups/addMatchup";
import { IconButton } from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import SnackbarSuccess from "../../snackbarNotifications/SnackbarSuccess";
import { useAppDispatch } from "../../../hooks/hooks";
import { useCookies } from "react-cookie";
import DeckInputDropdown from "../../shared/deckInputDropdown";
import SnackbarWarning from "../../snackbarNotifications/SnackbarWarning";
import { unwrapResult } from "@reduxjs/toolkit";

interface matchupFormProps {
	userDeckDisplays: DeckDisplay[];
}

export default function MatchupForm({ userDeckDisplays }: matchupFormProps) {
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
	const [snackbarSuccessMessage, setSnackbarSuccessMessage] =
		React.useState<string>("");
	const [snackbarWarningMessage, setSnackbarWarningMessage] =
		React.useState<string>("");
	const [snackbarKey, setSnackbarKey] = React.useState<number>(0);

	const [cookies] = useCookies(["userRole"]);
	const [userCookies] = useCookies(["user"]);

	const userRole = cookies["userRole"]?.payload;
	const user: CredentialResponse = userCookies["user"]?.payload;

	const [winningDeckOptionsArray, setWinningDeckOptionsArray] = React.useState<
		string[]
	>([]);

	const dispatch = useAppDispatch();

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

	const deduceDeck = (cards: Set<string>): string => {
		let bestMatches: string[] = [];
		let highestMatchCount = 0;

		for (const deck of ALL_DECKS_CONSTANT) {
			const matchCount = deck.cards.reduce(
				(count, card) => (cards.has(card) ? count + 1 : count),
				0
			);

			if (matchCount > highestMatchCount) {
				highestMatchCount = matchCount;
				bestMatches = [deck.label]; // Reset with current best match
			} else if (matchCount === highestMatchCount && matchCount !== 0) {
				bestMatches.push(deck.label); // Add to ties if match count is equal to the highest
			}
		}
		// Handle the case where there may be multiple best matches
		if (bestMatches.length >= 1) {
			return bestMatches[0]; // Return the single best match
		}
		return "Unknown"; // Default if no match is found
	};

	const parseGameLog = (log: string) => {
		const lines = log.split("\n");
		let playerOneName = "",
			playerTwoName = "",
			startingPlayer = "",
			winningDeck = "Unknown";
		let playerOneDeck = "Unknown",
			playerTwoDeck = "Unknown";
		const playerOneCards = new Set<string>();
		const playerTwoCards = new Set<string>();
		let currentPlayer = "";

		const allCardNames = new Set<string>();
		ALL_DECKS_CONSTANT.forEach((deck) => {
			deck.cards.forEach((card) => allCardNames.add(card));
		});

		lines.forEach((line) => {
			// if (line.includes("- ")) return; // Skip lines with card effects
			if (line.includes("   ")) return; // Skip lines with card effects

			if (
				line.includes("for the opening coin flip") ||
				line.includes("won the coin toss")
			) {
				const parts = line.split(" ");
				const playerName = parts[0];
				if (!playerOneName) {
					playerOneName = playerName;
				} else if (!playerTwoName && playerName !== playerOneName) {
					playerTwoName = playerName;
				}
			} else if (line.includes("Turn #")) {
				const turnInfo = line.match(/Turn # \d+ - (.+)'s Turn/);

				if (turnInfo) {
					const playerName = turnInfo[1]; // Directly capture the player's name
					// If we've not yet identified playerTwoName, do so here based on whose turn it is
					if (!playerTwoName && playerName !== playerOneName) {
						playerTwoName = playerName;
					}
					// Set currentPlayer based on playerName
					if (!startingPlayer) {
						startingPlayer = currentPlayer;
					}
					currentPlayer = playerName;
					// console.log("Who is current player? " + currentPlayer);
				}
			}

			const processLine = (line: string, currentPlayer: string) => {
				allCardNames.forEach((cardName) => {
					if (line.includes(cardName)) {
						// If current player is equal to playerOne, skip lines that include playerTwo. A stronger algo could be created.
						if (
							currentPlayer === playerOneName &&
							!line.includes(playerTwoName)
						) {
							playerOneCards.add(cardName);
							// console.log("Player One Cards:", Array.from(playerOneCards));
						} else if (
							currentPlayer === playerTwoName &&
							!line.includes(playerOneName)
						) {
							playerTwoCards.add(cardName);
							// console.log("Player Two Cards:", Array.from(playerTwoCards));
						}
					}
				});
			};
			// console.log(`Processing line: ${line}, as ${currentPlayer}`);
			processLine(line, currentPlayer);
		});

		// Deduce decks after processing all cards
		playerOneDeck = deduceDeck(playerOneCards);
		playerTwoDeck = deduceDeck(playerTwoCards);

		// Adjust winningDeck based on deduced decks
		const winningLine = lines.find((line) => line.includes("wins."));
		if (winningLine) {
			const winnerName = winningLine.split(" ")[0];
			winningDeck =
				winnerName === playerOneName ? playerOneDeck : playerTwoDeck;
		}

		return {
			playerOneName,
			playerTwoName,
			startingPlayer,
			winningDeck,
			playerOneDeck,
			playerTwoDeck,
		};
	};

	const handleGameLogChange = (e: any) => {
		const gameLog = e.target.value;
		setNotes(gameLog);

		const firstLine = gameLog.split("\n")[0];
		if (firstLine.startsWith("Setup")) {
			const parsedData = parseGameLog(gameLog);

			// Update your component's state based on the parsed data
			setPlayerOneName(parsedData.playerOneName);
			setPlayerTwoName(parsedData.playerTwoName);
			setStartingPlayer(parsedData.startingPlayer);
			setPlayerOneDeckName(parsedData.playerOneDeck);
			setPlayerTwoDeckName(parsedData.playerTwoDeck);
			updateWinningDeckOptions(
				parsedData.playerOneDeck,
				parsedData.playerTwoDeck
			);
			setWinningDeck(parsedData.winningDeck);
		}
	};

	const updateWinningDeckOptions = (
		playerOneDeckName: string,
		playerTwoDeckName: string
	) => {
		const newOptions = [playerOneDeckName, playerTwoDeckName];
		if (playerOneDeckName !== playerTwoDeckName) {
			// Add "Tie" option if decks are different
			newOptions.push("Tie");
		}
		setWinningDeckOptionsArray(newOptions);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		let username = "";
		let email = "";

		let token = user.credential;

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
				role: userRole,
				email: email,
			},
			notes,
		};
		// console.log(matchup);

		try {
			const actionResult = await dispatch(addNewMatchup({ user, matchup }));
			const result = unwrapResult(actionResult);
			setNotes("");
			setSnackbarSuccessMessage("Matchup successfully added!");
			setSnackbarKey((prevKey) => prevKey + 1);
		} catch (err) {
			console.error(err);
			setSnackbarWarningMessage("Failed to add matchup. Please try again.");
			setSnackbarKey((prevKey) => prevKey + 1);
		}
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "30ch" },
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
							size="large"
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
							size="large"
						>
							<LooksOneIcon />
						</IconButton>
					</Box>
				</Box>
			</div>

			<div>
				{/* @TODO: Fix SnackbarNotification to show after every successful submit */}
				{/* @TODO: Pass in the allDecksConstant as a combo of constants and user specific decks */}
				<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
					<Box
						sx={{
							position: "relative",
							display: "inline-flex",
							width: "auto",
							alignItems: "center",
						}}
					></Box>
					<DeckInputDropdown
						id="outlined-deck-one"
						label="Player One Deck"
						decks={ALL_DECKS_CONSTANT.concat(userDeckDisplays)}
						value={playerOneDeckName}
						onChange={(e) => handlePlayerOneDeckChange(e)}
					/>
					<DeckInputDropdown
						id="outlined-deck-two"
						label="Player Two Deck"
						decks={ALL_DECKS_CONSTANT.concat(userDeckDisplays)}
						value={playerTwoDeckName}
						onChange={(e) => handlePlayerTwoDeckChange(e)}
					/>
					<IconButton>
						<LooksOneIcon />
					</IconButton>
				</Box>
			</div>
			<div>
				<TextField
					id="winning-deck"
					select
					label="Winning Deck"
					value={winningDeck}
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
					// onChange={(e) => setNotes(e.target.value)}
					onChange={handleGameLogChange}
				/>
			</div>
			<Button variant="outlined" onClick={handleSubmit}>
				Submit
			</Button>
			{snackbarSuccessMessage && (
				<SnackbarSuccess key={snackbarKey} message={snackbarSuccessMessage} />
			)}
			{snackbarWarningMessage && (
				<SnackbarWarning key={snackbarKey} message={snackbarWarningMessage} />
			)}
			<div className="accordion-matchup-component">
				<AccordionMatchup />
			</div>
		</Box>
	);

	function determineWinningDeckOptions(
		deckName: string,
		playerDeckName: string
	) {
		if (deckName === playerDeckName) {
			setWinningDeckOptionsArray([deckName, "Tie"]);
		} else {
			setWinningDeckOptionsArray([playerDeckName, deckName, "Tie"]);
		}
	}
}

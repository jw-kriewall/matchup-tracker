import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { decks } from "../constants/decks";
import { formats } from "../constants/formats"
import Button from "@mui/material/Button";
import AccordionMatchup from './AccordionMatchup'
import { userInfo } from "os";
import { v4 as uuidv4 } from 'uuid';
import { Matchup } from "../types/Matchup";
import Checkbox from '@mui/material/Checkbox';
import { OAuth2Response } from "../types/OAuth2Response";
import jwt_decode from 'jwt-decode';
import { DecodedJwtToken } from "../types/DecodedJwtToken";
import { useDispatch, useStore } from 'react-redux'
import matchupFeedSlice from "../redux/MatchupFeedSlice";
import { addNewMatchup } from "../apiCalls/addMatchup";
import { useAppDispatch } from "../hooks/hooks";
import { match } from "assert";
import { AppDispatch } from "../data/store";

export default function MatchupForm() {

	const store = useStore();

	const [playerOneName, setPlayerOneName] = React.useState<string>("");
	const [playerTwoName, setPlayerTwoName] = React.useState<string>("");
	const [playerOneDeckName, setPlayerOneDeckName] = React.useState<string>("");
	const [playerTwoDeckName, setPlayerTwoDeckName] = React.useState<string>("");
	const [playerOneDecklist, setPlayerOneDecklist] = React.useState<string>("blank");
	const [playerTwoDecklist, setPlayerTwoDecklist] = React.useState<string>("blank");
	
	const [startingPlayer, setStartingPlayer] = React.useState<string>("");
	const [winningDeck, setWinningDeck] = React.useState<string>("");
	const [format, setFormat] = React.useState<string>("");
	const [notes, setNotes] = React.useState<string>("");

	const [winningDeckOptionsArray, setWinningDeckOptionsArray] = React.useState<string[]>([]);

	const [matchupData, setMatchupData] = React.useState<Matchup[]>([]);

	// const { addToMatchups } = matchupFeedSlice.actions
	const dispatch = useDispatch<AppDispatch>();

	// TODO: Starting player
	// reset notes to blank after submission

	const handlePlayerOneDeckChange = (e: any) => {
		e.preventDefault();
		let deckName = e.target.value;
		setPlayerOneDeckName(deckName)
		determineWinningDeckOptions(deckName, playerTwoDeckName);
	}
	const handlePlayerTwoDeckChange = (e: any) => {
		e.preventDefault();
		let deckName = e.target.value;
		setPlayerTwoDeckName(deckName);
		determineWinningDeckOptions(deckName, playerOneDeckName);
	}
	const handleStartingPlayerCheckbox = (e: any) => {
		let player = e.target.checked
		console.log(player)
		setStartingPlayer(player)
	}
	

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		let role = "basic"
		let username = ''
		let email = ''

		let oauth: OAuth2Response = JSON.parse(localStorage.getItem("user")!)
		let token = oauth.credential
		
		if(token) {
			try {
				const decodedToken: DecodedJwtToken = jwt_decode(token);
				email = decodedToken.email
				username = decodedToken.name
			} catch (error) {
				console.error('Error decoding JWT: ', error);
			}
		}

		const matchup: Matchup = {
			// matchup schema goes here...
			id: undefined,
			playerOneName,
			playerOneDeck: {
				name: playerOneDeckName,
				cards: playerOneDecklist
			},
			playerTwoName,
			playerTwoDeck: {
				name: playerTwoDeckName,
				cards: playerTwoDecklist
			},
			startingPlayer,
			winningDeck,
			format,
			createdOn: new Date(),
			createdBy: {
				username: username,
				role: role,
				email: email
			},
			notes
		}

		console.log(matchup)

		dispatch(addNewMatchup(matchup));
		setNotes("")
	}

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
		>
			<div className="first-player-buttons">
				{/* <Button variant="outlined">{playerOneName}</Button> */}
				{}
			</div>

			<div>
				<Checkbox onChange={(e) => handleStartingPlayerCheckbox(e.target.checked)}/>
				<TextField
					id="outlined-multiline-flexible"
					label="Player One"
					multiline
					onChange={(e) => setPlayerOneName(e.target.value)}
				/>
				<TextField
					id="outlined-textarea"
					label="Player Two"
					multiline
					onChange={(e) => setPlayerTwoName(e.target.value)}
				/>
				<Checkbox/>
			</div>

			<div>
				<TextField
					id="outlined-deck-one"
					select
					label="Select Deck 1"
					defaultValue=""
					onChange={(e) => handlePlayerOneDeckChange(e)}
				>
					{decks.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>

				<TextField
					id="outlined-deck-two"
					select
					label="Select Deck 2"
					defaultValue=""
					onChange={(e) => handlePlayerTwoDeckChange(e)}
				>
					{decks.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
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
					//   fullWidth
					rows={3}
					defaultValue=""
					fullWidth={true}
					onChange={(e) => setNotes(e.target.value)}
				/>
			</div>
			<Button variant="outlined" onClick={handleSubmit}>Submit</Button>
			<div className="accordion-matchup-component">
				{/* show last 10 matchups with option to show all in second screen. Linked to which user created it */}
				<AccordionMatchup />
			</div>
		</Box>
	);

	function determineWinningDeckOptions(deckName: any, playerDeckName: any) {
		if (deckName === playerDeckName) {
			setWinningDeckOptionsArray([deckName]);
		} else {
			setWinningDeckOptionsArray([playerDeckName, deckName]);
		}
	}
}

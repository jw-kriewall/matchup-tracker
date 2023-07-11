import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { decks } from "../constants/decks";
import Button from "@mui/material/Button";

export default function SelectTextFields() {

    const [playerOneName, setPlayerOneName] = React.useState<string>();
    const [playerTwoName, setPlayerTwoName] = React.useState<string>();
    const [playerOneDecklist, setPlayerOneDecklist] = React.useState<string>();
    const [playerTwoDecklist, setPlayerTwoDecklist] = React.useState<string>();

    const [playerOneDeckName, setPlayerOneDeckName] = React.useState<string>();
    const [playerTwoDeckName, setPlayerTwoDeckName] = React.useState<string>();


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const matchup = {
            // matchup schema goes here...
            playerOneName,
            playerOneDeck: {
                name: playerOneDeckName,
                cards: playerOneDecklist},
            playerTwoName,
            playerTwoDeck: {
                name: playerTwoDeckName,
                cards: playerTwoDecklist},
            winningDeck: "???"
        }
        console.log(matchup)
        fetch("http://localhost:8090/matchups/add",{

            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(matchup)
        
    }).then(() => {
        console.log("Matchup Added : " + JSON.stringify(matchup))
    })
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
			<div>
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
			</div>

			<div>
				<TextField
					id="outlined-deck-one"
					select
					label="Select Deck 1"
					defaultValue=""
                    onChange={(e) => setPlayerOneDeckName(e.target.value)}
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
                    onChange={(e) => setPlayerTwoDeckName(e.target.value)}
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
					id="outlined-multiline-static"
					label="Notes"
					multiline
					//   fullWidth
					rows={4}
					defaultValue=""
				/>
			</div>
			<Button variant="outlined" onClick={handleSubmit}>Submit</Button>
		</Box>
	);
}

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { decks } from "../constants/decks";
import Button from "@mui/material/Button";

export default function SelectTextFields() {

    const [playerOneName, setPlayerOneName] = React.useState<string>();
    const [playerTwoName, setPlayerTwoName] = React.useState<string>();
    const [playerOneDecklist, setPlayerOneDecklist] = React.useState<string>("blank");
    const [playerTwoDecklist, setPlayerTwoDecklist] = React.useState<string>("blank");
    const [playerOneDeckName, setPlayerOneDeckName] = React.useState<string>("");
    const [playerTwoDeckName, setPlayerTwoDeckName] = React.useState<string>("");
    const [notes, setNotes] = React.useState<string>("");
    const [winningDeck, setWinningDeck] = React.useState<string>("");

    const [winningDeckOptionsArray, setWinningDeckOptionsArray] = React.useState<string[]>([]);

    const handlePlayerOneDeckChange = (e: any) => {
        e.preventDefault();
        let deckName = e.target.value;
        setPlayerOneDeckName(deckName)
        if(!winningDeckOptionsArray.includes(deckName)) {
            setWinningDeckOptionsArray(winningDeckOptionsArray => winningDeckOptionsArray.concat(deckName));
        }
    }
    const handlePlayerTwoDeckChange = (e: any) => {
        e.preventDefault();
        let deckName = e.target.value;
        setPlayerTwoDeckName(deckName)
        if(!winningDeckOptionsArray.includes(deckName)) {
            setWinningDeckOptionsArray(winningDeckOptionsArray => winningDeckOptionsArray.concat(deckName));
        }
    }

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
            winningDeck,
            notes
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
		</Box>
	);
}

import React, { useState, ChangeEvent } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useCookies } from "react-cookie";

interface DeckDisplay {
	value: string;
	label: string;
	format: string;
	cards: string[];
	sprites: string[];
}

interface Props {
	onSubmit: (deckDisplay: DeckDisplay) => void; // Prop to handle the submit action
}

export const DeckDisplayForm: React.FC<Props> = ({ onSubmit }) => {
    const [cookies] = useCookies(["format"]);
	const [deckDisplay, setDeckDisplay] = useState<DeckDisplay>({
		value: "",
		label: "",
		format: cookies.format,
		cards: [],
		sprites: [],
	});

	const handleChange =
        (prop: keyof DeckDisplay) => (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setDeckDisplay(prev => ({
                ...prev,
                [prop]: newValue,
                ...(prop === 'value' && { label: newValue })
            }));
        };

	const handleSubmit = () => {
		onSubmit(deckDisplay);
	};

	return (
		<Box
			display="flex"
            flexDirection="column"
            alignItems="flex-end"
		>
			<TextField
				label="Deck Name"
				fullWidth
				margin="normal"
				value={deckDisplay.value}
				onChange={handleChange("value")}
			/>
			<TextField
                disabled
				label="Format"
				fullWidth
				margin="normal"
				value={deckDisplay.format}
				onChange={handleChange("format")}
			/>
            {/* @TODO: Add Sprites and autopopulate cards */}
			{/* <TextField
							label="Cards"
							fullWidth
							margin="normal"
							value={newDeckDisplay.cards.join(", ")}
							onChange={(e) => setNewDeckDisplay({ ...newDeckDisplay, cards: []})}
						/>
						<TextField
							label="Sprites"
							fullWidth
							margin="normal"
							value={newDeckDisplay.sprites.join(", ")}
							onChange={(e) => setNewDeckDisplay({ ...newDeckDisplay, sprites: [] })}
						/> */}
			<Button onClick={handleSubmit} variant="outlined" color="primary" sx={{marginTop: "10px"}}>
				Submit Deck
			</Button>
		</Box>
	);
};

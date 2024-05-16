import React, { useState, ChangeEvent, useRef, useEffect } from "react";
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
	const inputRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleChange =
		(prop: keyof DeckDisplay) => (event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setDeckDisplay((prev) => ({
				...prev,
				[prop]: newValue,
				...(prop === "value" && { label: newValue }),
			}));
			if (error) {
				setError(null);
			}
		};

	const handleSubmit = () => {
		if (deckDisplay.value.length < 1) {
			setError("Deck name cannot be blank.");
			return;
		}
		alert("Deck submitted!");
		onSubmit(deckDisplay);
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="flex-end">
			<TextField
				label="Deck Name"
				fullWidth
				margin="normal"
				inputRef={inputRef} // Set ref to manage focus
				onChange={handleChange("value")}
				inputProps={{ maxLength: 35 }}
				error={Boolean(error)}
				helperText={error}
			/>
			<TextField
				disabled
				label="Format"
				fullWidth
				margin="normal"
				value={deckDisplay.format}
				onChange={handleChange("format")}
			/>
			<Button
				onClick={handleSubmit}
				variant="outlined"
				color="primary"
				sx={{ marginTop: "10px" }}
			>
				Submit Deck
			</Button>
		</Box>
	);
};

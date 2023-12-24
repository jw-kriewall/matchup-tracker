import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { allDecksConstant } from "../../constants/allDecks";

interface DeckFilterProps {
  selectedDecks: string[];
  onSelectedDecksChange: (selectedDecks: string[]) => void;
}

const DeckFilter: React.FC<DeckFilterProps> = ({ selectedDecks, onSelectedDecksChange }) => {
  const handleDeckChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    onSelectedDecksChange(value);
  };

  const availableDecks = allDecksConstant.map((deck) => deck.value);

  return (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel id="deck-select-label">Select Decks</InputLabel>
      <Select
        labelId="deck-select-label"
        id="deck-select"
        multiple
        value={selectedDecks}
        onChange={handleDeckChange}
        input={<OutlinedInput id="deck-select-label" label="Select Decks" />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              gap: 0.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {selected.map((value: string) => (
              <Chip
                key={value}
                label={value}
                style={{ backgroundColor: "#07bcf7" }}
              />
            ))}
          </Box>
        )}
      >
        {availableDecks.map((name: string) => (
          <MenuItem
            key={name}
            value={name}
            style={{
              backgroundColor: selectedDecks.includes(name)
                ? "#07bcf7"
                : "transparent",
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DeckFilter;
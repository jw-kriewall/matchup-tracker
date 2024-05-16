import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

interface DeckFilterProps {
  selectedDecks: string[];
  allDecks: string[];
  onSelectedDecksChange: (selectedDecks: string[]) => void;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 250,
    },
  },
};

function DeckFilter({
  selectedDecks,
  allDecks,
  onSelectedDecksChange,
}: DeckFilterProps) {
  const handleDeckChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    onSelectedDecksChange(value);
  };

  // const dynamicDecks = [...selectedDecks];

  return (
    <FormControl fullWidth>
      <InputLabel id="deck-select-label">Select Decks</InputLabel>
      <Select
        labelId="deck-select-label"
        id="deck-select"
        multiple
        MenuProps={MenuProps}
        value={selectedDecks}
        onChange={handleDeckChange}
        input={<OutlinedInput id="deck-select-label" label="Select Decks" />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              whiteSpace: "nowrap",
              gap: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "72px",
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
        {allDecks.map((name: string) => (
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
}

export default DeckFilter;

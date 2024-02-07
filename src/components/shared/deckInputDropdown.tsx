import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { allDecksConstant } from "../../constants/allDecks";

interface DeckInputDropdownProps {
  id: string;
  label: string;
//   decks: DeckDisplay
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeckInputDropdown = ({ id, label, onChange }: DeckInputDropdownProps) => {
  return (
    <TextField
      id={id}
      select
      label={label}
      defaultValue=""
      SelectProps={{
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        },
      }}
      onChange={onChange}
    >
      {allDecksConstant.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {option.label}
            <Box sx={{ display: "flex" }}>
              {option.sprites.map((sprite, index) => (
                <img
                  key={index}
                  src={sprite}
                  alt={option.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    marginLeft: "2px",
                  }}
                />
              ))}
            </Box>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DeckInputDropdown;

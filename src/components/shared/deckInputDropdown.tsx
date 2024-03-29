import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { DeckDisplay } from "../../types/MatchupModels";

interface DeckInputDropdownProps {
  id: string;
  label: string;
  decks: DeckDisplay[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeckInputDropdown = ({
  id,
  label,
  decks,
  value,
  onChange,
}: DeckInputDropdownProps) => {
  return (
    <TextField
      id={id}
      select
      label={label}
      value={value}
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
      {decks.map((option) => (
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
                    width: "22px",
                    height: "22px",
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

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { allDecksConstant } from "../../../constants/allDecks";
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
import DeckSelectField from "../../shared/deckInputDropdown";

export default function MatchupForm() {
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
    console.log(matchup);

    try {
      await dispatch(addNewMatchup({ user, matchup }));
      setNotes("");
      await setSnackbarSuccessMessage("Matchup successfully added!");
      setSnackbarSuccessMessage("");
    } catch (err) {
      console.error(err);
      setSnackbarWarningMessage("Failed to add matchup. Please try again.");
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
        <DeckSelectField
          id="outlined-deck-one"
          label="Player One Deck"
          onChange={(e) => handlePlayerOneDeckChange(e)}
        />
        <DeckSelectField
          id="outlined-deck-two"
          label="Player Two Deck"
          onChange={(e) => handlePlayerTwoDeckChange(e)}
        />
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
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
      {snackbarSuccessMessage && (
        <SnackbarSuccess message={snackbarSuccessMessage} />
      )}
      {snackbarWarningMessage && (
        <SnackbarSuccess message={snackbarWarningMessage} />
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

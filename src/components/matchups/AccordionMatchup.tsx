import * as React from "react";
import Typography from "@mui/material/Typography";
import { Matchup } from "../../types/MatchupModels";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMatchups } from "../../apiCalls/matchups/getMatchups";
import { store } from "../../data/store";
import Box from "@mui/material/Box";
import { deleteSingleMatchup } from "../../apiCalls/matchups/deleteMatchup";
import { useCookies } from "react-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ControlledAccordions() {
  const matchups: Matchup[] | undefined = useAppSelector(
    (state) => state.matchupReducer.matchups
  );
  const [userCookies] = useCookies(["user"]);
  const user = userCookies["user"]?.payload;

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isInitialized, setInitialized] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<{ [key: number]: boolean }>({});

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const dispatch = useAppDispatch();

  const handleDeleteMatchup = (matchup: Matchup) => async () => {
    if (user) {
      console.log(matchup);
      setLoading(true);
      try {
        await dispatch(deleteSingleMatchup({ user, matchup })).unwrap();
        dispatch(getMatchups(user));
      } catch (error) {
        console.error("Failed to delete matchup:", error);
      } finally {
        setOpen({});
        setLoading(false);
      }
    }
  };

  const handleClick = (index: number) => {
    setOpen((prevOpen: any) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  const getMatchupsIfAuthorized = () => {
    if (user) {
      dispatch(getMatchups(user))
        .unwrap()
        .then(handleInit)
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  React.useEffect(() => {
    if (!isInitialized && user) {
      getMatchupsIfAuthorized();
    }
  }, [isInitialized]);

  function handleInit() {
    const currentState: any = store.getState();

    if (currentState.matchups > 0) {
      setInitialized(true);
    }
  }

  return (
    <div className="matchup-accordion">
      {loading ? (
        // @TODO: Create a loading component
        <h3>LOADING...</h3>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Game</TableCell>
                <TableCell align="center">Matchup</TableCell>
                <TableCell align="right">Winner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matchups.map((matchup, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell>
                      <Button onClick={() => handleClick(index)}>
                        {open[index] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {matchups.length - index}
                    </TableCell>
                    <TableCell align="center">
                      {matchup.playerOneDeck.name} VS{" "}
                      {matchup.playerTwoDeck.name}
                    </TableCell>
                    <TableCell align="right">{matchup.winningDeck}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteMatchup(matchup)()}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse in={open[index]} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography>
                            <b>Starting Player:</b> {matchup.startingPlayer}
                          </Typography>
                          <Typography>
                            <b>Notes:</b> {matchup.notes}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

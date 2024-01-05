import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Matchup } from "../../types/MatchupModels";
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMatchups } from "../../apiCalls/matchups/getMatchups";
import { store } from "../../data/store";
import Box from '@mui/material/Box';
import { deleteSingleMatchup } from "../../apiCalls/matchups/deleteMatchup";

export default function ControlledAccordions() {

	const matchups: Matchup[] | undefined = useAppSelector((state) => state.matchupReducer.matchups)
	const user = useAppSelector((state) => state.userReducer.user)

	const [expanded, setExpanded] = React.useState<string | false>(false);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isInitialized, setInitialized] = React.useState<boolean>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const dispatch = useAppDispatch();

	const handleDeleteMatchup = (matchup: Matchup) => () => {
		//@TODO: should setLoading value trigger a loading bar?
		if (user) {
			setLoading(true);
			dispatch(deleteSingleMatchup(matchup));
			setLoading(false);
		}
	}

	const getMatchupsIfAuthorized = () => {
		if (user) {
			dispatch(getMatchups(user))
				.unwrap()
				.then(handleInit)
				.catch((error: any) => {
					console.log(error)
				})
		}
	}

	React.useEffect(() => {
		if (!isInitialized && user) {
			getMatchupsIfAuthorized();
		}
		// getMatchupsIfAuthorized();
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
				matchups?.map((matchup, index) => (
					<Accordion
						key={index}
						expanded={expanded === "panel" + index}
						onChange={handleChange("panel" + index)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>

								<Typography sx={{ width: '33%', flexShrink: 0 }}>
									Game {matchups.length - index}
								</Typography>
								<Typography sx={{ color: "text.secondary", textAlign: 'center', width: '34%' }}>
									{matchup.playerOneDeck.name} VS {matchup.playerTwoDeck.name}{" "}
									<b>Winner: </b> {matchup.winningDeck}
								</Typography>
								<Box sx={{ width: '33%' }} />
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								<b>Starting Player: </b>
								{matchup.startingPlayer}
							</Typography>
							<Typography>
								<b>Notes: </b>
								{matchup.notes}
							</Typography>
							<Button variant="outlined" color="error" onClick={handleDeleteMatchup(matchup)}>DELETE</Button>
						</AccordionDetails>
					</Accordion>
				))
			)}
		</div>
	);
}

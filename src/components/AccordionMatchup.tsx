import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Matchup } from "../types/Matchup";
import Button from '@mui/material/Button';
import { OAuth2Response } from "../types/OAuth2Response";
import { useAppSelector } from "../hooks/hooks";
import { getMatchups } from "../apiCalls/getMatchups";
import { store } from "../data/store";
import { deleteSingleMatchup } from "../apiCalls/deleteMatchup";

export default function ControlledAccordions() {

	const matchups = useAppSelector((state) => state.matchupReducer.matchups)
	const user = useAppSelector((state) => state.userReducer.user)

	const [expanded, setExpanded] = React.useState<string | false>(false);
	const [matchupArray, setMatchupArray] = React.useState<Matchup[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isInitialized, setInitialized] = React.useState<boolean>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
	};

	const deleteMatchup = (matchup: Matchup) => () => {
		let token = ''
		if (user) {
			axios.delete("http://localhost:8090/matchups/delete/" + matchup.id)
			console.log("Deletion successful")
			// deleteSingleMatchup(matchup)
		}
		let oauth: OAuth2Response = JSON.parse(localStorage.getItem("user")!)
			token = oauth.credential
			store.dispatch(getMatchups(token))
	}

	const getMatchupsIfAuthorized = () => {
		let token = '';
			if(user) {
				let oauth: OAuth2Response = JSON.parse(localStorage.getItem("user")!)
				token = oauth.credential
				store.dispatch(getMatchups(token))
					.unwrap()
					.then(handleInit)
					.catch((error: any) => {
						console.log(error)
				})
			}
	}

	React.useEffect(() => {
		if(!isInitialized && user) {
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
				<h3>LOADING...</h3>
			) : (
				matchups.map((matchup, index) => (
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
							<Typography sx={{ width: "33%", flexShrink: 0 }}>
								Game {matchups.length - index}
							</Typography>
							<Typography sx={{ color: "text.secondary" }}>
								{matchup.playerOneDeck.name} VS {matchup.playerTwoDeck.name}{" "}
								<b>Winner: </b> {matchup.winningDeck}
							</Typography>
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
							<Button variant="outlined" color="error" 
								onClick={deleteMatchup(matchup)}>DELETE</Button>
						</AccordionDetails>
					</Accordion>
				))
			)}
		</div>
	);
}

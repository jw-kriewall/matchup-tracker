import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Matchup } from "../types/Matchup";
import Button from '@mui/material/Button';

export default function ControlledAccordions() {
	const [expanded, setExpanded] = React.useState<string | false>(false);
	const [matchupArray, setMatchupArray] = React.useState<Matchup[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	// const deleteMatchup = (e: any) => {
	// 	return axios.delete("http://localhost:8090/matchups/delete/" , {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		}
	// 	})
	// 	.then(res => { console.log("Deletion Response: " + res); return res })
	// 	.catch(err => { console.log(err); return err })
	// }

	const deleteMatchup = (matchup: Matchup) => () =>{
		axios.delete("http://localhost:8090/matchups/delete/" + matchup.id)
		console.log("Deletion successful")
	}

	React.useEffect(() => {
		const loadMatchups = async () => {
			setLoading(true);

			const response = await axios({
        url:"http://localhost:8090/matchups/getAll",
        method: "GET",
        withCredentials: false,});
			setMatchupArray(response.data);

			console.log(response.data);

			setLoading(false);
		};
		loadMatchups();
	}, []);

	//@TODO: When I submit a matchup, it must populate immediately on the screen

	return (
		<div className="matchup-accordion">
			{loading ? (
				<h3>LOADING...</h3>
			) : (
				matchupArray.reverse().map((matchup, index) => (
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
								Game {index + 1}
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

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
		let token = "";

			if(localStorage.getItem("user")) {
				
				let user: OAuth2Response = JSON.parse(localStorage.getItem("user")!)
				token = user.credential
			}
		const loadMatchups = async () => {
			setLoading(true);
			// let token = "";

			// if(localStorage.getItem("user") !== null) {
				
			// 	let user: User = JSON.parse(localStorage.getItem("user")!)
			// 	token = user.credential
			// }


			const response = await axios({
				url:"http://localhost:8090/matchups/getAll",
				method: "GET",
				headers: {	
					'Access-Control-Allow-Origin': "*",
					"Access-Control-Allow-Methods": "GET, POST",
					Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjkxMWUzOWUyNzkyOGFlOWYxZTlkMWUyMTY0NmRlOTJkMTkzNTFiNDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NDYxNzE0MjczOTEtOXExbGtuYTFpYnBncTQ5ZzJmaXZsOG0yZWRnNjMwNGEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NDYxNzE0MjczOTEtOXExbGtuYTFpYnBncTQ5ZzJmaXZsOG0yZWRnNjMwNGEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQyMDI5MDI5OTE4Njk0MTUyNDIiLCJlbWFpbCI6ImJyY2t0cHJvamVjdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNjkxMDY0NTg5LCJuYW1lIjoiQlJDS1QgUHJvamVjdCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRmdFYwRVQzcjZXWGlCUm5ORFpVU1FBSXdKVUUyZ0dybkFwbVdjRmVneEFDQT1zOTYtYyIsImdpdmVuX25hbWUiOiJCUkNLVCIsImZhbWlseV9uYW1lIjoiUHJvamVjdCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjkxMDY0ODg5LCJleHAiOjE2OTEwNjg0ODksImp0aSI6IjVhM2JlM2U5YTkyOWQ0ZGExOTk2MzE1Yjc2NGVjOTdlYTMwYzc5OTQifQ.oEjNompyVxyHCCn2TzZSndt3x8m70syUUuiqGhvvYjwVbvfF4c3cEi5gLhXpit_j5m_thqGtkFO0Fm3z3_g0DIumltroMLcbCZxeMNTOPaS2_m10UUE2fnSQhbFq3EvaXWBBjYTWVxn46-Q3bxf5YpKNC2z4EPiTstIgFftfo28BIAiCjyRbIKAaTaIqRx7tygG_EyoNDDg22ALvvbplT887-SVjWGzQQsElaybCmBIvwsfHcmLE98SJ5-gz5oXKPrkFodEuOyC7iXFSx0BGP1earZUkxRvK94Glmcz63Y3e_NdcRSyI6UWNDwJnFXD_xVlzk-qBpnyiw_XvqvFnkQ",
					"Accept": "*/*",
					"Access-Control-Allow-Headers": "Content-Type, X-Auth-Token, Origin, Authorization"
				},
				
				// withCredentials: true,
			});
					setMatchupArray(response.data);

					console.log(response.data);
					console.log("From Get request" + localStorage.getItem("user"))
				};
				
				if(localStorage.getItem("user") ) {
					console.log("From localStorage Conditional")
					loadMatchups();
					setLoading(false);
				}
		
	}, []);

	//@TODO: When I submit a matchup, it must populate immediately on the screen

	return (
		<div className="matchup-accordion">
			{loading ? (
				<h3>LOADING...</h3>
			) : (
				matchupArray.map((matchup, index) => (
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
								Game {matchupArray.length - index}
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

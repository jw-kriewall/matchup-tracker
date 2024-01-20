import React, { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import DeckFilter from "../../components/deckFilter/DeckFilter";
import NavBar from "../../components/navBar/NavBar";
import { allDecksConstant } from "../../constants/allDecks";
import useUser from "../../hooks/userHook";
import CountMatchups from "../../components/matchups/countMatchups/CountMatchups";
import TournamentSimulator from "../../components/tournamentSimulator/TournamentSimulator";

export default function SimulatorPage() {
	const initialDecks = allDecksConstant.map((deck) => deck.value);
	// const [selectedDecks, setSelectedDecks] = useState<string[]>(initialDecks);
	const user = useUser();

	if (!user) {
		return (
			<div>
				<div className="navigation">
					<NavBar />
				</div>

				{/* TODO: Create a fun log in component */}
				<div>Please log in to view content.</div>
			</div>
		)
	}

	return (
		<div>
			<div className="navigation">
				<NavBar />
			</div>

			<div className="bento-box">
				<TournamentSimulator user={user}/>
			</div>
		</div>
	);
}

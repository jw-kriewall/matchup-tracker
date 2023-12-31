import React, { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import DeckFilter from "../../components/deckFilter/DeckFilter";
import NavBar from "../../components/navBar/NavBar";
import { allDecksConstant } from "../../constants/allDecks";
import useUser from "../../hooks/userHook";
import './TablePage.css';
import CountMatchups from "../../components/matchups/countMatchups/CountMatchups";

export default function TablePage() {
	const initialDecks = allDecksConstant.map((deck) => deck.value);
	const [selectedDecks, setSelectedDecks] = useState<string[]>(initialDecks);
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
				<div className="left-column">
					<div className="matchup-count">
						<CountMatchups
							selectedDecks={selectedDecks}
							user={user}
						/>
					</div>
					<div className="deck-filter">
						<DeckFilter
							selectedDecks={selectedDecks}
							onSelectedDecksChange={setSelectedDecks}
							initialDecks={initialDecks}
						/>
					</div>
				</div>
				<div className="data-table">
					<DataTable
						selectedDecks={selectedDecks}
						user={user}
					/>
				</div>
			</div>
		</div>
	);
}

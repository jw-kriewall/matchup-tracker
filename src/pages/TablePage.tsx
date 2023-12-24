import React, { useState } from "react";
import DataTable from "../components/dataTable/DataTable";
import DeckFilter from "../components/deckFilter/DeckFilter";
import NavBar from "../components/navBar/NavBar";
import { allDecksConstant } from "../constants/allDecks";

export default function TablePage() {
	const initialDecks = allDecksConstant.map((deck) => deck.value);
	const [selectedDecks, setSelectedDecks] = useState<string[]>(initialDecks);

	return (
		<div className="App">
			<div className="navigation">
				<NavBar />
			</div>
			<div className="deck-filter">
				<DeckFilter
					selectedDecks={selectedDecks}
					onSelectedDecksChange={setSelectedDecks}
					initialDecks={initialDecks}
				/>
			</div>
			<div className="data-table">
				<DataTable selectedDecks={selectedDecks} />
			</div>
		</div>
	);
}

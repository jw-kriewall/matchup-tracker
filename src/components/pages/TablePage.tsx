import React, { useState } from "react";
import DataTable from "../dataTable/DataTable";
import DeckFilter from "../deckFilter/DeckFilter";
import NavBar from "../navBar/NavBar";
import { allDecksConstant } from "../../constants/allDecks";

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
				/>
			</div>
			<div className="data-table">
				<DataTable selectedDecks={selectedDecks} />
			</div>
		</div>
	);
}

import { TableData } from "../../types/TableTypes";

export default function DataTable() {
	// This is the data object sent back by API
    // @TODO: data call for tableData - dependant on user
	const tableData: TableData = {
		Pikachu: {
			"Pikachu": "0-0-1",
			Charizard: "7-2-0",
			Bulbasaur: "1-2-0",
		},
		Charizard: {
			Pikachu: "2-7-0",
			Charizard: "2-2-0",
			Bulbasaur: "2-0-1",
		},
		Bulbasaur: {
			Pikachu: "2-1-0",
			Charizard: "0-2-1",
			Bulbasaur: "1-1-0",
			Wartortle: "4-23-3",
		},
		Wartortle: {
			Venusaur: "3-0-0",
			Golbat: "2-5-2",
			Wartortle: "1-1",
			Bulbasaur: "23-4-3",
		},
	};

	const allDecks = new Set<string>();
	Object.keys(tableData).forEach((deck) => {
		allDecks.add(deck);
		Object.keys(tableData[deck]).forEach((opponent) => allDecks.add(opponent));
	});
	const decks = Array.from(allDecks);

	function calculateWinPercentage(record: string): string {
		const [wins, losses, ties] = record.split("-").map(Number);
		const totalMatches = wins + losses; // Include ties in the total matches

		if (wins + losses + ties === 0) {
			return "N/A";
		}
		// If there are no matches, or there are only ties (no wins or losses), return 50
		if (wins === 0 && losses === 0) {
            const winPercentage = 50
			return winPercentage.toFixed(1);
		}
		const winPercentage = (wins / totalMatches) * 100;
		return winPercentage.toFixed(1);
	}

	return (
		<table className="matchup-table">
			<thead>
				<tr>
					<th></th>
					{decks.map((deck) => (
						<th key={deck}>{deck}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{decks.map((deckRow, index) => (
					<tr key={deckRow}>
						<th>{deckRow}</th>
						{decks.map((deckCol) => {
							const record = tableData[deckRow]
								? tableData[deckRow][deckCol] || "0-0-0"
								: "0-0-0";
							const winPercentage = calculateWinPercentage(record);
							return (
								<td
									key={deckCol}
									style={{
										backgroundColor: `hsl(${winPercentage}, 100%, 50%)`,
										textAlign: "center",
									}}
								>
                                    {/* @TODO - eliminate % when N/A */}
									{`${winPercentage}%`}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}

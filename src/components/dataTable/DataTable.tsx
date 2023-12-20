import { useEffect, useMemo, useState } from "react";
import { MatchupRecord, TableData } from "../../types/TableTypes";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function DataTable() {
	const dispatch = useAppDispatch();
	const [tableData, setTableData] = useState<TableData>({});
	// filteredDecks is defined inside a component and changes on every render so I am using useMemo here to prevent running useEffect infinitely.
	const filteredDecks = useMemo(() => ['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle', 'Wartortle', "Venusaur"], []); // List of all decks. This is working so will just need a filter adjustment strategy.
	const user = useAppSelector((state) => state.userReducer.user)

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			if (user) {
				try {
					const response = await dispatch(getMatchupRecordsByDeck({ user }));
					if (response && isMounted) {
						const fetchedData: TableData = response.payload;

						const data: TableData = Object.keys(fetchedData).reduce((acc, deck) => {
							if (filteredDecks.includes(deck)) {
								acc[deck] = Object.keys(fetchedData[deck]).reduce((innerAcc, opponent) => {
									if (filteredDecks.includes(opponent)) {
										innerAcc[opponent] = fetchedData[deck][opponent];
									}
									return innerAcc;
								}, {} as MatchupRecord);
							}
							return acc;
						}, {} as TableData);

						setTableData(data);
					}
				} catch (error) {
					console.error("Error fetching data for decks", error);
				}
			}
		};
		fetchData();

		return () => {
			isMounted = false;
		};
	}, [dispatch, user?.credential, filteredDecks]);

	const allDecks = new Set<string>();
	Object.keys(tableData).forEach((deck) => {
		allDecks.add(deck);
		Object.keys(tableData[deck]).forEach((opponent) => allDecks.add(opponent));
	});
	const decks = Array.from(allDecks);

	function calculateWinPercentage(record: string): string {
		const [wins, losses, ties] = record.split("-").map(Number);
		const totalMatches = wins + losses; // Do not include ties in totalMatches

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

	function formatWinPercentage(winPercentage: string) {
		if (winPercentage === 'N/A') {
			return winPercentage;
		}
		return `${winPercentage}%`;
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
									{formatWinPercentage(winPercentage)}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}

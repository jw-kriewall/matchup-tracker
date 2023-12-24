import { useEffect, useState } from "react";
import { TableData } from "../../types/TableTypes";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./DataTable.css";

interface DataTableProps {
	selectedDecks: string[];
}

function DataTable({ selectedDecks }: DataTableProps) {
	const dispatch = useAppDispatch();
	const [tableData, setTableData] = useState<TableData>({});
	const [hoveredCell, setHoveredCell] = useState<string | null>(null);
	const user = useAppSelector((state) => state.userReducer.user);

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				try {
					const response = await dispatch(getMatchupRecordsByDeck({ user }));
					if (response) {
						setTableData(response.payload);
					}
				} catch (error) {
					console.error("Error fetching data for decks", error);
				}
			}
		};
		fetchData();
	}, [dispatch, user]);

	function calculateWinPercentage(record: string): string {
		const [wins, losses, ties] = record.split("-").map(Number);
		const totalMatches = wins + losses; // Do not include ties in totalMatches

		if (wins + losses + ties === 0) {
			return "N/A";
		}
		// If there are no matches, or there are only ties (no wins or losses), return 50
		if (wins === 0 && losses === 0) {
			const winPercentage = 50;
			return winPercentage.toFixed(1);
		}
		const winPercentage = (wins / totalMatches) * 100;
		return winPercentage.toFixed(1);
	}

	function formatWinPercentage(winPercentage: string) {
		if (winPercentage === "N/A") {
			return winPercentage;
		}
		return `${winPercentage}%`;
	}

	if (!user) {
		// @TODO - separate to own component for reusability
		return <div>Please log in to view content.</div>;
	}

	return (
		<>
			<table className="matchup-table">
				<thead>
					<tr>
						<th style={{ border: "none", background: "transparent" }}></th>
						{selectedDecks.map((deck) => (
							<th key={deck}>{deck}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{selectedDecks.map((deckRow, index) => (
						<tr key={deckRow}>
							<th>{deckRow}</th>
							{selectedDecks.map((deckCol) => {
								const key = `${deckRow}-${deckCol}`;
								const record = tableData[deckRow]
									? tableData[deckRow][deckCol] || "0-0-0"
									: "0-0-0";
								const winPercentage = calculateWinPercentage(record);
								return (
									<td
										key={key}
										onMouseEnter={() => setHoveredCell(key)}
										onMouseLeave={() => setHoveredCell(null)}
										style={{
											backgroundColor: `hsl(${winPercentage}, 100%, 50%)`,
											textAlign: "center",
											cursor: "pointer",
										}}
									>
										{hoveredCell === key ? (
											<div className="record-style">{record}</div>
										) : (
											formatWinPercentage(winPercentage)
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
export default DataTable;
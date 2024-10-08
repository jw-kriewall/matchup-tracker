import React from "react";
import { useEffect, useState } from "react";
import { TableData } from "../../types/TableTypes";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { useAppDispatch } from "../../hooks/hooks";
import { calculateWinPercentage, formatWinPercentage } from "./DataTableUtil";
import "./DataTable.css";

interface DataTableProps {
	selectedDecks: string[];
	userToken: string;
	format: string;
}

function DataTable({ selectedDecks, userToken, format }: DataTableProps) {
	const dispatch = useAppDispatch();
	const [tableData, setTableData] = useState<TableData>({});
	const [hoveredCell, setHoveredCell] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (userToken) {
				try {
					const response = await dispatch(getMatchupRecordsByDeck({ userToken, format }));
					if (response) {
						setTableData(response.payload);
					}
				} catch (error) {
					console.error("Error fetching data for decks", error);
				}
			}
		};
		fetchData();
	}, [dispatch, userToken, format]);

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
								const record = tableData[deckRow] && tableData[deckRow][deckCol]
									? tableData[deckRow][deckCol]
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
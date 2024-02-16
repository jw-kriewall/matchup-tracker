import React from "react";
import { useEffect, useState } from "react";
import { TableData } from "../../types/TableTypes";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { useAppDispatch } from "../../hooks/hooks";
import { calculateWinPercentage, formatWinPercentage } from "./DataTableUtil";
import { CredentialResponse } from "@react-oauth/google";
import "./DataTable.css";
import { useSelector } from "react-redux";
import { selectTableData } from "../../redux/TableDataSlice";
import { selectMatchups } from "../../redux/MatchupFeedSlice";

interface DataTableProps {
	selectedDecks: string[];
	user: CredentialResponse
}

function DataTable({ selectedDecks, user}: DataTableProps) {
	const dispatch = useAppDispatch();
	const tableDataState = useSelector(selectTableData);
	const matchupDataState = useSelector(selectMatchups);
	const [tableData, setTableData] = useState<TableData>({});
	const [hoveredCell, setHoveredCell] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			console.log(tableDataState.data)
			console.log(matchupDataState.matchups)
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
			// else {
			// 	setTableData(tableDataState.data);
			// }
		};
		fetchData();
	}, [dispatch, user]);

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
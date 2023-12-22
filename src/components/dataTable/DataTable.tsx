import { useEffect, useMemo, useState } from "react";
import { MatchupRecord, TableData } from "../../types/TableTypes";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { allDecksConstant } from "../../constants/allDecks";
import "./DataTable.css";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 			width: 250,
// 		},
// 	},
// };

export default function DataTable() {
	const dispatch = useAppDispatch();
	const [tableData, setTableData] = useState<TableData>({});
	// filteredDecks is defined inside a component and changes on every render so I am using useMemo here to prevent running useEffect infinitely.
	const filteredDecks = useMemo(
		() => allDecksConstant.map((deck) => deck.value),
		[]
	);
	const [hoveredCell, setHoveredCell] = useState<string | null>(null);
    const [selectedDecks, setSelectedDecks] = useState<string[]>(filteredDecks);
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

    const handleDeckChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setSelectedDecks(typeof value === "string" ? value.split(",") : value);
    };

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
			<FormControl sx={{ m: 1, width: 400 }}>
				<InputLabel id="deck-select-label">Select Decks</InputLabel>
				<Select
					labelId="deck-select-label"
					id="deck-select"
					multiple
					value={selectedDecks}
					onChange={handleDeckChange}
					input={<OutlinedInput id="deck-select-label" label="Select Decks" />}
					renderValue={(selected) => (
						<Box
							sx={{
								display: "flex",
								gap: 0.2,
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								maxWidth: "100%",
							}}
						>
							{selected.map((value) => (
								<Chip
									key={value}
									label={value}
									style={{ backgroundColor: "#07bcf7" }}
								/>
							))}
						</Box>
					)}
					// MenuProps={MenuProps}
				>
					{filteredDecks.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={{
								backgroundColor: selectedDecks.includes(name)
									? "#07bcf7"
									: "transparent",
							}}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

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

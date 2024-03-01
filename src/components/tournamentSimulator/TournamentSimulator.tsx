import React, { useEffect, useState } from "react";
import { CredentialResponse } from "@react-oauth/google";
import "./TournamentSimulator.css";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectTableData } from "../../redux/TableDataSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ResultsModal from "./ResultsModal";
import CircularProgress from '@mui/material/CircularProgress';

interface simulatorProps {
	user: CredentialResponse;
	filteredDecks: string[];
}

interface DeckPerformance {
	wins: number;
	losses: number;
}

interface Player {
	id: number;
	deckName: string;
	record: DeckPerformance;
	receivedBye: boolean;
}

interface TournamentSimulatorInput {
	deckCounts: { [deck: string]: number };
	matchupPercentages: { [deck: string]: { [opponentDeck: string]: number } };
	numberOfRounds: number;
}

// @TODO: Bring in user data - should it be automatic or should it be set on a button click?
// Button click is probably easier - so everything is initialized and then the API call is made. Ensures that no extra API calls are made.
// API can be called once and button press just resets to 'cached' data.

// @TODO: filtered decks can be a module like other page.

// @TODO: aggregate simulation
// Description: simulation over 1000 / 100 / 10000 games and aggregate

// @TODO: Suggested number of rounds based on total players

function TournamentSimulator({ user, filteredDecks }: simulatorProps) {
	// const [data, setData] = useState<TableData>({});
	const minPlayers = 0;
	const maxPlayers = 500;
	const minRounds = 1;
	const maxRounds = 20;

	const dispatch = useAppDispatch();
	const tableData = useSelector(selectTableData);
	const [deckCounts, setDeckCounts] = useState<{ [deck: string]: number }>({});
	const [numberOfRounds, setNumberOfRounds] = useState<number>(minRounds);
	const [results, setResults] = useState<string>("");
	const [isActualData, setIsActualData] = useState(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [matchupPercentages, setMatchupPercentages] = useState<{
		[deck: string]: { [opponentDeck: string]: number };
	}>({});
	
	useEffect(() => {
		if (!user) return;

		const fetchData = async () => {
			try {
				await dispatch(getMatchupRecordsByDeck({ user }));
			} catch (error) {
				console.error("Error fetching data for decks", error);
			}
		};
		fetchData();
	}, [user, dispatch]);

	useEffect(() => {
		if (Object.keys(tableData.data).length > 0) {
			setMatchupPercentages(initializeMatchupPercentages());
		}
	}, [tableData.data, filteredDecks]);

	useEffect(() => {
		const newMatchupPercentages = initializeMatchupPercentages();
		setMatchupPercentages(newMatchupPercentages);
	}, [isActualData, filteredDecks, tableData.data]);

	// Function to initialize matchup percentages
	const initializeMatchupPercentages = () => {
		const initialMatchupPercentages: {
			[deck: string]: { [opponentDeck: string]: number };
		} = {};
		filteredDecks.forEach((deck) => {
			initialMatchupPercentages[deck] = {};
			filteredDecks.forEach((opponentDeck) => {
				if (deck !== opponentDeck) {
					const matchupData = tableData.data[deck]?.[opponentDeck];
					let matchupPercentage = 50.0; // Default to 50%

					if (isActualData && matchupData) {
						const [wins, losses, ties] = matchupData.split("-").map(Number);
						const totalGames = wins + losses;
						if (totalGames > 0) {
							matchupPercentage = +((wins / totalGames) * 100).toFixed(1);
						}
					}
					initialMatchupPercentages[deck][opponentDeck] = matchupPercentage;
				}
			});
		});
		return initialMatchupPercentages;
	};

	const handleSimulation = () => {
		setIsLoading(true);
		console.log(isLoading);
		setTimeout(async () => {
			try {
				const calculatedMatchupPercentages =
					calculateMatchupPercentages(matchupPercentages);
				const simulationResults = simulateTournament({
					deckCounts,
					matchupPercentages: calculatedMatchupPercentages,
					numberOfRounds,
				});

				const averageResults = calculateAverageResults(
					simulationResults,
					deckCounts
				);
				const formattedResults = formatSimulationResults(averageResults);
				setResults(formattedResults);
				setModalOpen(true);
			} catch (error) {
				console.error("Simulation error: ", error);
			} finally {
				setIsLoading(false);
			}
		}, 0);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	  };

	const updateDeckCount = (deck: string, count: number) => {
		setDeckCounts({ ...deckCounts, [deck]: count });
	};

	const updateMatchupPercentage = (
		deck: string,
		opponentDeck: string,
		percentage: number
	) => {
		setMatchupPercentages((prev) => ({
			...prev,
			[deck]: {
				...prev[deck],
				[opponentDeck]: percentage,
			},
			[opponentDeck]: {
				...prev[opponentDeck],
				[deck]: +(100 - percentage).toFixed(1),
			},
		}));
	};

	function calculateMatchupPercentages(userMatchupPercentages: {
		[deck: string]: { [opponentDeck: string]: number };
	}): { [deck: string]: { [opponentDeck: string]: number } } {
		let calculatedPercentages: {
			[deck: string]: { [opponentDeck: string]: number };
		} = {};

		for (let deck in userMatchupPercentages) {
			calculatedPercentages[deck] = {};

			for (let opponentDeck in userMatchupPercentages) {
				if (deck !== opponentDeck) {
					if (
						userMatchupPercentages[deck] &&
						userMatchupPercentages[deck][opponentDeck] !== undefined
					) {
						calculatedPercentages[deck][opponentDeck] =
							userMatchupPercentages[deck][opponentDeck];
					} else {
						// Calculate default matchup percentage based on data
						// This is where you'd implement your logic to calculate percentages
						// For example, using the parseMatchupRecord function:
						// const record = data[deck][opponentDeck] || "0-0-0";
						const record = "1-1-0";
						calculatedPercentages[deck][opponentDeck] =
							parseMatchupRecord(record);
					}
				}
			}
		}
		return calculatedPercentages;
	}

	function calculateAverageResults(
		results: { [deck: string]: DeckPerformance },
		deckCounts: { [deck: string]: number }
	): { [deck: string]: DeckPerformance } {
		let averageResults: { [deck: string]: DeckPerformance } = {};

		Object.keys(results).forEach((deck) => {
			const deckTotal = deckCounts[deck];
			averageResults[deck] = {
				wins: parseFloat((results[deck].wins / deckTotal).toFixed(2)),
				losses: parseFloat((results[deck].losses / deckTotal).toFixed(2)),
			};
		});
		return averageResults;
	}

	function formatSimulationResults(simulationResults: {
		[deck: string]: DeckPerformance;
	}): string {
		// @TODO: format this as a String[]
		return Object.entries(simulationResults)
			.sort((a, b) => b[1].wins - a[1].wins)
			.map(
				([deck, performance]) =>
					`${deck}: ${performance.wins} Wins, ${performance.losses} Losses`
			)
			.join("\n");
	}

	function parseMatchupRecord(record: string): number {
		const [wins, losses, draws] = record.split("-").map(Number);
		if (isNaN(wins) || isNaN(losses) || wins + losses === 0) {
			return 50.0; // default to 50% if invalid data
		}
		return (wins / (wins + losses)) * 100; // convert to percentage
	}

	const createPlayers = (deckCounts: { [deck: string]: number }): Player[] => {
		let players: Player[] = [];
		let playerId = 0;

		for (const deckName in deckCounts) {
			for (let i = 0; i < deckCounts[deckName]; i++) {
				players.push({
					id: playerId++,
					deckName: deckName,
					record: { wins: 0, losses: 0 },
					receivedBye: false,
				});
			}
		}
		return players;
	};

	const assignBye = (players: Player[], matchedPlayers: Set<number>) => {
		let eligiblePlayersForBye = players.filter(
			(player) => !player.receivedBye && !matchedPlayers.has(player.id)
		);

		if (eligiblePlayersForBye.length > 0) {
			// Sort by fewest wins, then randomly select one player if there's a tie
			eligiblePlayersForBye.sort((a, b) => a.record.wins - b.record.wins);
			const fewestWins = eligiblePlayersForBye[0].record.wins;
			let tiedPlayers = eligiblePlayersForBye.filter(
				(player) => player.record.wins === fewestWins
			);

			let randomIndex = Math.floor(Math.random() * tiedPlayers.length);
			let playerForBye = tiedPlayers[randomIndex];

			playerForBye.record.wins++; // Increment wins for the player who receives a bye
			playerForBye.receivedBye = true;
			matchedPlayers.add(playerForBye.id);
			console.log(
				`Player ${playerForBye.id} with deck ${playerForBye.deckName} receives a bye`
			);
		}
	};

	const simulateTournament = ({
		deckCounts,
		matchupPercentages,
		numberOfRounds,
	}: TournamentSimulatorInput) => {
		let players = createPlayers(deckCounts);

		for (let round = 1; round <= numberOfRounds; round++) {
			console.log(`Round ${round} starts`);

			shuffleArray(players);

			let matchedPlayers = new Set<number>();
			let previousMatchups = new Map<number, Set<number>>();

			if (players.length % 2 !== 0 && matchedPlayers.size < players.length) {
				assignBye(players, matchedPlayers);
			}

			for (let i = 0; i < players.length; i++) {
				if (matchedPlayers.has(players[i].id)) continue;

				let potentialOpponents = players.filter(
					(p) =>
						p.id !== players[i].id &&
						!matchedPlayers.has(p.id) &&
						!previousMatchups.get(players[i].id)?.has(p.id)
				);

				// Sort potential opponents by record closeness
				potentialOpponents.sort((a, b) => {
					// Ensure both players are defined and have a record
					if (!a || !a.record || !b || !b.record) return 0;

					let recordDiffA =
						Math.abs(a.record.wins - players[i].record.wins) +
						Math.abs(a.record.losses - players[i].record.losses);
					let recordDiffB =
						Math.abs(b.record.wins - players[i].record.wins) +
						Math.abs(b.record.losses - players[i].record.losses);
					return recordDiffA - recordDiffB;
				});
			}

			// Pair players and simulate matches
			for (let i = 0; i < players.length; i++) {
				if (matchedPlayers.has(players[i].id)) continue;

				let potentialOpponents = players.filter(
					(p) =>
						p.id !== players[i].id &&
						!matchedPlayers.has(p.id) &&
						!previousMatchups.get(players[i].id)?.has(p.id)
				);

				// Sort potential opponents by record closeness
				potentialOpponents.sort((a, b) => {
					if (!a || !a.record || !b || !b.record) return 0;
					let recordDiffA =
						Math.abs(a.record.wins - players[i].record.wins) +
						Math.abs(a.record.losses - players[i].record.losses);
					let recordDiffB =
						Math.abs(b.record.wins - players[i].record.wins) +
						Math.abs(b.record.losses - players[i].record.losses);
					return recordDiffA - recordDiffB;
				});

				if (potentialOpponents.length > 0) {
					let opponent = potentialOpponents[0];
					simulateMatch(players[i], opponent, matchupPercentages);
					matchedPlayers.add(players[i].id).add(opponent.id);

					// Update previous matchups
					if (!previousMatchups.has(players[i].id))
						previousMatchups.set(players[i].id, new Set<number>());
					if (!previousMatchups.has(opponent.id))
						previousMatchups.set(opponent.id, new Set<number>());
					previousMatchups.get(players[i].id)?.add(opponent.id);
					previousMatchups.get(opponent.id)?.add(players[i].id);
				}
			}

			console.log(`Round ${round} results:`);
			players.forEach((player) =>
				console.log(
					`Player ${player.id} (${player.deckName}): ${player.record.wins}-${player.record.losses}`
				)
			);
		}

		// Aggregate results
		let aggregatedResults: { [deck: string]: DeckPerformance } = {};
		players.forEach((player) => {
			if (!aggregatedResults[player.deckName]) {
				aggregatedResults[player.deckName] = { wins: 0, losses: 0 };
			}
			aggregatedResults[player.deckName].wins += player.record.wins;
			aggregatedResults[player.deckName].losses += player.record.losses;
		});

		// Log final results
		console.log("Final tournament results:");
		for (const deckName in aggregatedResults) {
			console.log(
				`${deckName}: ${aggregatedResults[deckName].wins}-${aggregatedResults[deckName].losses}`
			);
		}

		return aggregatedResults;
	};

	function shuffleArray(array: Player[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	const simulateMatch = (
		player1: Player,
		player2: Player,
		matchupPercentages: { [deck: string]: { [opponentDeck: string]: number } }
	) => {
		let winPercentagePlayer1 =
			matchupPercentages[player1.deckName]?.[player2.deckName] ?? 50.0;

		console.log(
			`Win Percentage for ${player1.deckName} against ${player2.deckName}: ${winPercentagePlayer1}`
		);

		// Simulate match based on win percentages
		let randomRoll = Math.random();
		if (randomRoll < winPercentagePlayer1) {
			// Player 1 wins
			player1.record.wins++;
			player2.record.losses++;
			console.log(
				`Player ${player1.id} (${player1.deckName}) wins against Player ${player2.id} (${player2.deckName})`
			);
		} else {
			// Player 2 wins
			player1.record.losses++;
			player2.record.wins++;
			console.log(
				`Player ${player2.id} (${player2.deckName}) wins against Player ${player1.id} (${player1.deckName})`
			);
		}
	};

	return (
		<>
			<TableContainer sx={{ maxHeight: 540, overflow: "auto" }}>
				<Table
					stickyHeader
					className="simulator-table"
					aria-label="sticky table"
				>
					<TableHead>
						<TableRow>
							<TableCell
								style={{ border: "none", background: "transparent" }}
							></TableCell>
							{filteredDecks.map((opponentDeck) => (
								<TableCell key={opponentDeck}>{opponentDeck}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredDecks.map((deck) => (
							<TableRow>
								<TableCell
									key={deck}
									component="th"
									scope="row"
									style={{
										position: "sticky",
										left: 0,
										zIndex: 100,
									}}
									// variant="standard"
								>
									{deck}
								</TableCell>
								{filteredDecks.map((opponentDeck) => (
									<TableCell key={opponentDeck}>
										{deck !== opponentDeck ? (
											<TextField
												id="outlined-number"
												type="number"
												error={
													matchupPercentages[deck]?.[opponentDeck].valueOf() >
														100 ||
													matchupPercentages[deck]?.[opponentDeck].valueOf() < 0
												}
												InputProps={{
													style: { minWidth: "5rem" },
													inputProps: {
														max: 100,
														min: 0,
														step: 0.1,
													},
												}}
												size="small"
												value={matchupPercentages[deck]?.[opponentDeck]}
												onChange={(e) =>
													updateMatchupPercentage(
														deck,
														opponentDeck,
														parseFloat(e.target.value)
													)
												}
												InputLabelProps={{
													shrink: true,
												}}
											/>
										) : (
											<TextField
												disabled
												id="outlined-number"
												type="number"
												InputProps={{
													style: { minWidth: "5rem" },
												}}
												size="small"
												value="50"
											/>
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Divider className="divider" />

			<div className="inputs-container">
				{filteredDecks.map((deck) => (
					<div key={deck} className="deck-input">
						<span className="deck-input-text">{deck}:</span>
						<div className="deck-input-field">
							<TextField
								id="outlined-number"
								type="number"
								InputProps={{
									style: { minWidth: "4rem" },
									inputProps: {
										max: maxPlayers,
										min: minPlayers,
									},
								}}
								inputMode="numeric"
								size="small"
								value={deckCounts[deck] || 0}
								onChange={(e) => {
									var value = parseInt(e.target.value, 10);
									
									if (value > maxPlayers) value = maxPlayers;
									if (value < minPlayers) value = minPlayers;
									
									updateDeckCount(deck, value)
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</div>
					</div>
				))}
			</div>
			<Divider className="divider" />
			<div className="round-input">
				Rounds (max: 20):
				<TextField
					id="outlined-number"
					type="number"
					InputProps={{
						style: { minWidth: "4rem" },
						inputProps: {
							max: 1000,
							min: 0,
						},
					}}
					inputMode="numeric"
					size="small"
					value={numberOfRounds}
					onChange={(e) => 
						{
							var value = parseInt(e.target.value, 10);
							
							if (value > maxRounds) value = maxRounds;
							if (value < minRounds) value = minRounds;

							setNumberOfRounds(value)}
						}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>

			<div className="sim-btn-bottom">
				<Button
					variant="contained"
					className="sim-tournament-btn"
					onClick={handleSimulation}
				>
					Simulate Tournament
				</Button>

				{isActualData ? (
					<Button
						className="data-btn"
						variant="outlined"
						startIcon={<RestartAltIcon />}
						onClick={() => setIsActualData(!isActualData)}
					>
						Reset Table
					</Button>
				) : (
					<Button
						className="data-btn"
						variant="outlined"
						startIcon={<ImportExportIcon />}
						onClick={() => setIsActualData(!isActualData)}
					>
						Import Data
					</Button>
				)}
				{ isLoading && (
					<div className="overlay-style">
					<CircularProgress color="inherit" size={100}/>
				  </div>
				) }
			</div>
			<>
				{results ? (
					<ResultsModal open={modalOpen} handleClose={handleCloseModal} results={results}/>
				) : null}
			</>
		</>
	);
}

export default TournamentSimulator;

import React, { useEffect, useState } from "react";
import { TableData } from "../../types/TableTypes";
import { useAppDispatch } from "../../hooks/hooks";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { CredentialResponse } from "@react-oauth/google";

interface simulatorProps {
  user: CredentialResponse;
  filteredDecks: string[]
}

function TournamentSimulator({ user, filteredDecks }: simulatorProps) {
  const [data, setData] = useState<TableData>({});
  const [deckCounts, setDeckCounts] = useState<{ [deck: string]: number }>({});
  const [numberOfRounds, setNumberOfRounds] = useState<number>(0);
  const [results, setResults] = useState<string>("");
  const [matchupPercentages, setMatchupPercentages] = useState<{
    [deck: string]: { [opponentDeck: string]: number };
  }>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Early return if no user

      try {
        const response = await dispatch(getMatchupRecordsByDeck({ user }));
        const fetchedData: TableData = response.payload;
        setData(fetchedData);

        // Initialize matchup percentages
        const initialMatchupPercentages =
          initializeMatchupPercentages(fetchedData);
        setMatchupPercentages(initialMatchupPercentages);
      } catch (error) {
        console.error("Error fetching data for decks", error);
      }
    };

    fetchData();
  }, [dispatch, user]); // Dependencies

  // Function to initialize matchup percentages
  const initializeMatchupPercentages = (fetchedData: TableData) => {
    const initialMatchupPercentages: {
      [deck: string]: { [opponentDeck: string]: number };
    } = {};
    Object.keys(fetchedData).forEach((deck) => {
      initialMatchupPercentages[deck] = {};
      Object.keys(fetchedData).forEach((opponentDeck) => {
        if (deck !== opponentDeck) {
          initialMatchupPercentages[deck][opponentDeck] = 0.5; // 50%
        }
      });
    });
    return initialMatchupPercentages;
  };

  const handleSimulation = () => {
    const calculatedMatchupPercentages = calculateMatchupPercentages(
      // data,
      matchupPercentages
    );

    // Call the simulateTournament function with the necessary arguments
    const simulationResults = simulateTournament({
      deckCounts,
      matchupPercentages: calculatedMatchupPercentages,
      numberOfRounds,
    });

    // Calculate average results
    const averageResults = calculateAverageResults(
      simulationResults,
      deckCounts
    );

    // Process and format the average results for display
    const formattedResults = formatSimulationResults(averageResults);

    // Set the formatted results to be displayed
    setResults(formattedResults);
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
        [deck]: 1 - percentage,
      },
    }));
  };

  function calculateMatchupPercentages(
    // data: TableData,
    userMatchupPercentages: {
      [deck: string]: { [opponentDeck: string]: number };
    }
  ): { [deck: string]: { [opponentDeck: string]: number } } {
    let calculatedPercentages: {
      [deck: string]: { [opponentDeck: string]: number };
    } = {};

    for (let deck in data) {
      calculatedPercentages[deck] = {};

      for (let opponentDeck in data) {
        if (deck !== opponentDeck) {
          if (
            userMatchupPercentages[deck] &&
            userMatchupPercentages[deck][opponentDeck] !== undefined
          ) {
            // Use the user-provided matchup percentage
            calculatedPercentages[deck][opponentDeck] =
              userMatchupPercentages[deck][opponentDeck];
          } else {
            // Calculate default matchup percentage based on data
            // This is where you'd implement your logic to calculate percentages
            // For example, using the parseMatchupRecord function:
            const record = data[deck][opponentDeck] || "0-0-0";
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
    return Object.entries(simulationResults)
      .map(
        ([deck, performance]) =>
          `${deck}: ${performance.wins} Wins, ${performance.losses} Losses`
      )
      .join("\n");
  }

  function parseMatchupRecord(record: string): number {
    const [wins, losses, draws] = record.split("-").map(Number);

    if (isNaN(wins) || isNaN(losses) || wins + losses === 0) {
      return 0;
    }

    return wins / (wins + losses);
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

  const simulateTournament = ({
    deckCounts,
    matchupPercentages,
    numberOfRounds,
  }: TournamentSimulatorInput) => {
    let players = createPlayers(deckCounts);

    for (let round = 1; round <= numberOfRounds; round++) {
      console.log(`Round ${round} starts`);

      // Reset matchedPlayers for the new round
      let matchedPlayers = new Set<number>();
      let previousMatchups = new Map<number, Set<number>>();

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

        if (potentialOpponents.length > 0) {
          let opponent = potentialOpponents[0];
          simulateMatch(players[i], opponent, matchupPercentages);
          matchedPlayers.add(players[i].id).add(opponent.id);

          // Update previous matchups
          if (!previousMatchups.has(players[i].id))
            previousMatchups.set(players[i].id, new Set<number>());
          previousMatchups.get(players[i].id)?.add(opponent.id);

          if (!previousMatchups.has(opponent.id))
            previousMatchups.set(opponent.id, new Set<number>());
          previousMatchups.get(opponent.id)?.add(players[i].id);
        }
      }

      // Handle byes if players are odd
      if (players.length % 2 !== 0 && matchedPlayers.size < players.length) {
        let eligiblePlayersForBye = players.filter(
          (p) => !p.receivedBye && !matchedPlayers.has(p.id)
        );

        eligiblePlayersForBye.sort((a, b) => {
          if (a.record.wins === b.record.wins) {
            return a.record.losses - b.record.losses; // Fewest losses if wins are equal
          }
          return a.record.wins - b.record.wins; // Fewest wins first
        });

        if (eligiblePlayersForBye.length > 0) {
          let fewestWins = Math.min(
            ...eligiblePlayersForBye.map((p) => p.record?.wins ?? 0)
          );
          let topEligiblePlayers = eligiblePlayersForBye.filter(
            (p) => (p.record?.wins ?? 0) === fewestWins
          );

          let randomIndex = Math.floor(
            Math.random() * topEligiblePlayers.length
          );
          let playerForBye = topEligiblePlayers[randomIndex];

          if (playerForBye && playerForBye.record) {
            playerForBye.record.wins++;
            playerForBye.receivedBye = true;
            matchedPlayers.add(playerForBye.id);
            console.log(
              `Player ${playerForBye.id} with deck ${playerForBye.deckName} receives a bye`
            );
          }
        }
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

      // Log round results
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

  const simulateMatch = (
    player1: Player,
    player2: Player,
    matchupPercentages: { [deck: string]: { [opponentDeck: string]: number } }
  ) => {
    let winPercentagePlayer1 =
      matchupPercentages[player1.deckName][player2.deckName];
    let winPercentagePlayer2 =
      matchupPercentages[player2.deckName][player1.deckName];

    // Handle cases where win percentages might be undefined
    if (winPercentagePlayer1 === undefined) winPercentagePlayer1 = 0.5; // Default to 50% (0.5) if matchup unknown
    if (winPercentagePlayer2 === undefined) winPercentagePlayer2 = 0.5; // Default to 50% (0.5) if matchup unknown

    // Simulate match based on win percentages
    let randomRoll = Math.random();
    if (randomRoll < winPercentagePlayer1) {
      player1.record.wins++;
      player2.record.losses++;
      console.log(
        `Player ${player1.id} (${player1.deckName}) wins against Player ${player2.id} (${player2.deckName})`
      );
    } else if (randomRoll < winPercentagePlayer1 + winPercentagePlayer2) {
      player1.record.losses++;
      player2.record.wins++;
      console.log(
        `Player ${player2.id} (${player2.deckName}) wins against Player ${player1.id} (${player1.deckName})`
      );
    }
    // Handle the scenario where both win percentages sum to less than 1 (100%)
    else {
      console.log(
        `Match between Player ${player1.id} (${player1.deckName}) and Player ${player2.id} (${player2.deckName}) is a draw`
      );
      // Optionally handle draw scenarios here
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Deck</th>
            {Object.keys(deckCounts).map((opponentDeck) => (
              <th key={opponentDeck}>{opponentDeck}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(deckCounts).map((deck) => (
            <tr key={deck}>
              <td>{deck}</td>
              {Object.keys(deckCounts).map((opponentDeck) => (
                <td key={opponentDeck}>
                  {deck !== opponentDeck ? (
                    <input
                      type="number"
                      value={matchupPercentages[deck]?.[opponentDeck] || 0}
                      onChange={(e) =>
                        updateMatchupPercentage(
                          deck,
                          opponentDeck,
                          parseFloat(e.target.value)
                        )
                      }
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  ) : (
                    "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Object.keys(data).map((deck) => (
          <div key={deck}>
            {deck}:
            <input
              type="number"
              value={deckCounts[deck] || 0}
              onChange={(e) => updateDeckCount(deck, parseInt(e.target.value))}
            />
          </div>
        ))}
        <div>
          Number of Rounds:
          <input
            type="number"
            value={numberOfRounds}
            onChange={(e) => setNumberOfRounds(parseInt(e.target.value))}
          />
        </div>
        <button onClick={handleSimulation}>Simulate Tournament</button>
        {results && <div>Result: {results}</div>}
      </div>
    </>
  );
}

export default TournamentSimulator;

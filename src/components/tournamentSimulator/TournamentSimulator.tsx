import React, { useEffect, useState } from "react";
import { TableData } from "../../types/TableTypes";
import { useAppDispatch } from "../../hooks/hooks";
import { getMatchupRecordsByDeck } from "../../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { CredentialResponse } from "@react-oauth/google";

interface simulatorProps {
  user: CredentialResponse;
}

function TournamentSimulator({ user }: simulatorProps) {
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
      if (user) {
        try {
          const response = await dispatch(getMatchupRecordsByDeck({ user }));
          if (response) {
            const fetchedData: TableData = response.payload;
            setData(fetchedData);

            // Initialize matchup percentages to 50%
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
            setMatchupPercentages(initialMatchupPercentages);
          }
        } catch (error) {
          console.error("Error fetching data for decks", error);
        }
      }
    };

    fetchData();
  }, [dispatch, user]);

  const handleSimulation = () => {
    const calculatedMatchupPercentages = calculateMatchupPercentages(
      data,
      matchupPercentages
    );

    // Call the simulateTournament function with the necessary arguments
    const simulationResults = simulateTournament(
      deckCounts,
      calculatedMatchupPercentages,
      numberOfRounds
    );

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
    data: TableData,
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

  function simulateTournament(
    deckCounts: { [deck: string]: number },
    matchupPercentages: { [deck: string]: { [opponentDeck: string]: number } },
    numberOfRounds: number
  ): { [deck: string]: DeckPerformance } {
    let results: { [deck: string]: DeckPerformance } = {};
  
    // Initialize results
    Object.keys(deckCounts).forEach((deck) => {
      results[deck] = { wins: 0, losses: 0 };
    });
  
    for (let round = 0; round < numberOfRounds; round++) {
      // Group decks by their current win count
      let groupedDecks: { [winCount: number]: string[] } = {};
      Object.keys(deckCounts).forEach((deck) => {
        const winCount = results[deck].wins;
        if (!groupedDecks[winCount]) {
          groupedDecks[winCount] = [];
        }
        for (let i = 0; i < deckCounts[deck]; i++) {
          groupedDecks[winCount].push(deck);
        }
      });
  
      // Sort groups by win count
      const winGroups = Object.keys(groupedDecks).map(Number).sort((a, b) => a - b);
  
      // Pair decks within each group and simulate matches
      winGroups.forEach((winCount) => {
        let decksInGroup = groupedDecks[winCount];
        
        // Shuffle the decks in the current group to randomize pairings
        decksInGroup.sort(() => Math.random() - 0.5);
  
        while (decksInGroup.length >= 2) {
          let deck1 = decksInGroup.pop();
          let deck2 = decksInGroup.pop();
  
          if (deck1 && deck2) {
            // Determine the winner based on matchup percentage
            const winProbability = matchupPercentages[deck1][deck2];
            const randomValue = Math.random();
            if (randomValue < winProbability) {
              results[deck1].wins++;
              results[deck2].losses++;
            } else {
              results[deck1].losses++;
              results[deck2].wins++;
            }
    
            console.log(`Round ${round + 1} - Matchup: ${deck1} vs ${deck2}, Result: ${randomValue < winProbability ? deck1 + " Wins" : deck2 + " Wins"}`);
          }
        }
  
        // If there's an odd number of decks, give the remaining deck a free win
        if (decksInGroup.length === 1) {
          let deckWithFreeWin = decksInGroup[0];
          results[deckWithFreeWin].wins++;
          console.log(`Round ${round + 1} - Deck with free win: ${deckWithFreeWin}`);
        }
      });
    }
  
    return results;
  }
  

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

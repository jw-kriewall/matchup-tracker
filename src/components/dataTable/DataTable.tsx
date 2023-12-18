export default function DataTable() {

type MatchupRecord = {
    [deck: string]: string;
  };
  
  // Define a type for the table data
  type TableData = {
    [deck: string]: MatchupRecord;
  };
  
  // This is the data object sent back by your API
  const tableData: TableData = {
    "Pikachu": {
      "Pikachu": "0-0-1",
      "Charizard": "7-2-0",
      "Bulbasaur": "1-2-0"
    },
    "Charizard": {
      "Pikachu": "2-7-0",
      "Charizard": "2-2-0",
      "Bulbasaur": "2-0-1"
    },
    "Bulbasaur": {
      "Pikachu": "2-1-0",
      "Charizard": "0-2-1",
      "Bulbasaur": "1-1-0"
    }
    // ... add all other matchups here
  };

  const decks = Object.keys(tableData);

  function calculateWinPercentage(record: string): string {
    const [wins, losses, ties] = record.split('-').map(Number);
    const totalMatches = wins + losses; // Include ties in the total matches
  
    if(wins + losses + ties === 0) {
        return "0.0"
    }
    // If there are no matches, or there are only ties (no wins or losses), return 50%
    if (wins === 0 && losses === 0) {
      return "50.0";
    }
    const winPercentage = (wins / totalMatches) * 100;
    return winPercentage.toFixed(1);
  }


  return (
    

      <table className="matchup-table">
        <thead>
          <tr>
            <th>Deck / Opponent</th>
            {decks.map(deck => (
              <th key={deck}>{deck}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {decks.map((deckRow, index) => (
            <tr key={deckRow}>
              <th>{deckRow}</th>
              {decks.map((deckCol) => {
                const record = tableData[deckRow][deckCol] || "0-0-0";
                const winPercentage = calculateWinPercentage(record);
                return (
                  <td key={deckCol} style={{
                    backgroundColor: `hsl(${winPercentage}, 100%, 50%)`,
                    textAlign: "center"
                  }}>
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
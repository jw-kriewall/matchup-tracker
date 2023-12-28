export function formatWinPercentage(winPercentage: string) {
  if (winPercentage === "N/A") {
    return winPercentage;
  }
  return `${winPercentage}%`;
}

export function calculateWinPercentage(record: string): string {
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
import { DeckDisplay } from "../../types/MatchupModels";

export default function sortDecksAlphabeticallyWithOtherAtEnd(allDecks: DeckDisplay[]) {
    return allDecks.sort((a, b) => {
      if (a.label === 'Other' && b.label !== 'Other') {
        return 1;
      } else if (a.label !== 'Other' && b.label === 'Other') {
        return -1;
      } else {
        return a.label.localeCompare(b.label);
      }
    });
  }
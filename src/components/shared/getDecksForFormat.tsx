import { ALL_DECKS_CONSTANT } from "../../constants/allDecks";
import { GLC_DECKS_CONSTANT } from "../../constants/glcDecks";
import { DeckDisplay } from "../../types/MatchupModels";

export const getDecksForFormat = (format?: string | undefined): DeckDisplay[] => {
    const validFormat = format || 'default';
    
    const formatDecksMapping: { [format: string]: DeckDisplay[] } = {
      'BRS-TEF': ALL_DECKS_CONSTANT,
      'GLC': GLC_DECKS_CONSTANT,

      'default': ALL_DECKS_CONSTANT
    };
  
    return formatDecksMapping[validFormat];
  };
import { BRS_TEF_DECKS_CONSTANT } from "../../constants/brsTefDecks";
import { GLC_DECKS_CONSTANT } from "../../constants/glcDecks";
import { DeckDisplay } from "../../types/MatchupModels";

export const getDecksForFormat = (format?: string | undefined): DeckDisplay[] => {
    const validFormat = format || 'default';
    
    const formatDecksMapping: { [format: string]: DeckDisplay[] } = {
      'BRS-TEF': BRS_TEF_DECKS_CONSTANT,
      'GLC': GLC_DECKS_CONSTANT,

      'default': BRS_TEF_DECKS_CONSTANT
    };
    return formatDecksMapping[validFormat];
  };
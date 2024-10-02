import { BRS_SCR_DECKS_CONSTANT } from "../../constants/brsScrDecks";
import { BRS_TEF_DECKS_CONSTANT } from "../../constants/brsTefDecks";
import { BRS_TWM_DECKS_CONSTANT } from "../../constants/brsTwmDecks";
import { GLC_DECKS_CONSTANT } from "../../constants/glcDecks";
import { DeckDisplay } from "../../types/MatchupModels";

export const getDecksForFormat = (format?: string | undefined): DeckDisplay[] => {
    const validFormat = format || 'default';
    
    const formatDecksMapping: { [format: string]: DeckDisplay[] } = {
      'BRS-SCR': BRS_SCR_DECKS_CONSTANT,
      'BRS-TWM': BRS_TWM_DECKS_CONSTANT,
      'BRS-TEF': BRS_TEF_DECKS_CONSTANT,
      'GLC': GLC_DECKS_CONSTANT,

      'default': BRS_TEF_DECKS_CONSTANT
    };
    return formatDecksMapping[validFormat];
  };
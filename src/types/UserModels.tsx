import { Deck, DeckDisplay } from "./MatchupModels";

export type UserInfo = {
	username: string,
	password?: string,
	email: string,
	decks?: Deck,
	role?: string,
	deckDisplays?: DeckDisplay
}
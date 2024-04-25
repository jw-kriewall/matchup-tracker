import { UserInfo } from "./UserModels";

export type Matchup = {
	id: number | undefined,
	playerOneName: string;
	playerOneDeck: Deck;
	playerTwoName: string;
	playerTwoDeck: Deck;
	createdOn: Date;
	startingPlayer: string;
	winningDeck: string;
	format: string;
	notes: string;
	createdBy: UserInfo
};

export type Deck = {
	name: string;
	cards: string;
}

export type DeckDisplay = {
	// id is optional because hardcoded values don't need an id - id's are for specific users.
	id?: number | undefined,
	value: string,
	label: string,
	format?: string,
	cards: string[],
	sprites: string[],
}

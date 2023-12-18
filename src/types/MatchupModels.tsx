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
	value: string,
	label: string,
	sprites: string[],
}

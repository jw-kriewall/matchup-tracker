export type Matchup = {
	id: number,
	playerOneName: string;
	playerOneDeck: Deck;
	playerTwoName: string;
	playerTwoDeck: Deck;
	createdOn: Date;
	startingPlayer: string;
	winningDeck: string;
	format: string;
	notes: string;
	createdBy: User
};

export type Deck = {
	name: string;
	cards: string;
}

export type User = {
		username: string;
		role: string;
		email: string;
	}

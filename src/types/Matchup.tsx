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

export type User = {
	credential: string,
	clientId: string,
	select_by: string
}

export type UserInfo = {
	username: string,
	role: string,
	email: string
}

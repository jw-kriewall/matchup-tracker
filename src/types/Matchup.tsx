export type Matchup = {
	id: number;
	playerOneName: string;
	playerOneDeck: {
		name: string;
		cards: string;
	};
	playerTwoName: string;
	playerTwoDeck: {
		name: string;
		cards: string;
	};
	startingPlayer: string;
	winningDeck: string;
	format: string;
	notes: string;
};

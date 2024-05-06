import { createSlice } from "@reduxjs/toolkit";
import { DeckDisplay } from "../types/MatchupModels";
import { createDeckDisplay } from "../apiCalls/deckDisplay/createDeckDisplay";
import { getUserDeckDisplay } from "../apiCalls/deckDisplay/getUserDeckDisplay";
import { deleteDeckDisplay } from "../apiCalls/deckDisplay/deleteDeckDisplay";
import { RootState } from "../data/store";
// import { removeMatchupsByDeckLabel, selectMatchups } from "./MatchupFeedSlice";

interface DeckDisplayState {
	isSuccess: boolean;
	isError: boolean;
	isLoading: boolean;
	deckDisplay: DeckDisplay[];
}

const initialState: DeckDisplayState = {
	isSuccess: false,
	isError: false,
	isLoading: false,
	deckDisplay: [],
};

const deckDisplaySlice = createSlice({
	name: "deckDisplay",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createDeckDisplay.fulfilled, (state, action) => {
				state.deckDisplay.push(action.payload);
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createDeckDisplay.rejected, (state) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createDeckDisplay.pending, (state, action) => {
				state.isError = false;
				state.isLoading = true;
				state.isSuccess = false;
			})

			.addCase(getUserDeckDisplay.fulfilled, (state, action) => {
				state.deckDisplay = action.payload;
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(getUserDeckDisplay.rejected, (state, action) => {
				state.deckDisplay = [];
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(getUserDeckDisplay.pending, (state, action) => {
				state.isError = false;
				state.isLoading = true;
				state.isSuccess = false;
			})

			.addCase(deleteDeckDisplay.fulfilled, (state, action) => {
				const returnObject: { id: number; label: string } = action.payload;
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.deckDisplay = state.deckDisplay.filter(
					(deck: DeckDisplay) => deck.id !== returnObject.id
				);				
			})
			.addCase(deleteDeckDisplay.rejected, (state) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteDeckDisplay.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
				state.isSuccess = false;
			});
	},
});

export const selectUserDeckDisplays = (state: RootState) => state.deckDisplayReducer.deckDisplay;
export default deckDisplaySlice.reducer;

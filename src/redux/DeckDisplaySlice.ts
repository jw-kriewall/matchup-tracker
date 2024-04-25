import { createSlice } from "@reduxjs/toolkit";
import { DeckDisplay } from "../types/MatchupModels";
import { createDeckDisplay } from "../apiCalls/deckDisplay/createDeckDisplay";
import { getUserDeckDisplay } from "../apiCalls/deckDisplay/getUserDeckDisplay";

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
			});
	},
});

export default deckDisplaySlice.reducer;

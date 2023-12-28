import { createSlice } from "@reduxjs/toolkit";
import { countMatchups } from "../apiCalls/matchups/countMatchups";
import { RootState } from "../data/store";

interface MatchupCount {
  count: Number,
  isSuccess: boolean,
  isError: boolean,
  isLoading: boolean,
  message: string
}

const initialState: MatchupCount = {
  count: 0,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ''
} 

const matchupCountSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(countMatchups.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(countMatchups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.count = action.payload
      })
      .addCase(countMatchups.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.count = 0;
        state.message = "Error displaying matchup count: " + action.payload
      });
  }
})

export const selectMatchupCount = (state: RootState) => state.matchupCountSlice.count
//@TODO: Is above correct?
export default matchupCountSlice.reducer
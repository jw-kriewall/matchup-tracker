import { createSlice } from "@reduxjs/toolkit";
import { TableData } from "../types/TableTypes";
import { getMatchupRecordsByDeck } from "../apiCalls/dataTable/getIndividualMatchupRecordsByDeck";
import { RootState } from "../data/store";

interface TableDataInitialState {
  isLoading: boolean,
  isSuccess: boolean,
  isError: string | boolean,
  data: TableData
}

const initialState: TableDataInitialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {}
}

const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchupRecordsByDeck.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getMatchupRecordsByDeck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMatchupRecordsByDeck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Failed to fetch data';
      });
  },
});

export const selectTableData = (state: RootState) => state.tableDataReducer
export default tableDataSlice.reducer
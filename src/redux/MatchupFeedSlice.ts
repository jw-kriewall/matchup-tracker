import { createSlice } from "@reduxjs/toolkit";
import { Matchup } from "../types/Matchup";
import { addNewMatchup } from "../apiCalls/addMatchup";
import { RootState, store } from "../data/store";
import { useAppSelector } from "../hooks/hooks";
import { getMatchups } from "../apiCalls/getMatchups";
import { useSelector } from "react-redux";
import { OAuth2Response } from "../types/OAuth2Response";
import axios from "axios";
import { deleteSingleMatchup } from "../apiCalls/deleteMatchup";

export interface MatchupFeedState {
    matchups: Matchup[],
    loading: boolean,
    isError: boolean,
    status: 'idle' | 'loading' | 'failed' | 'success'
}

const initialState: MatchupFeedState = {
    matchups: [],
    loading: false,
    isError: false,
    status: 'idle' 
}

const matchupFeedSlice = createSlice({
    name: 'matchup',
    initialState,
    reducers: {
        addToMatchups: (state, action) => {
            addNewMatchup(action.payload)
            state.matchups.push(action.payload)
            // state.matchups = [action.payload, ...state.matchups]
        },
        removeFromMatchups: (state, action) => {
            const matchupIndex = state.matchups?.indexOf(action.payload)
            if (matchupIndex) {
                state.matchups?.splice(matchupIndex, 1)
            }
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(addNewMatchup.fulfilled, (state, action) => {
            state.loading = false
            state.status = 'success'
            state.isError = true
            state.matchups.unshift(action.payload)
        })
        .addCase(addNewMatchup.rejected, (state, action) => {
            state.loading = false
            state.status = 'failed'
            state.isError = true
        })
        .addCase(addNewMatchup.pending, (state, action) => {
            state.loading = true
            state.status = 'loading'
            state.isError = false
        })
        .addCase(getMatchups.fulfilled, (state, action) => {
            state.isError = false
            state.status = 'success'
            state.loading = false
            state.matchups = action.payload
        })
        .addCase(getMatchups.pending, (state, action) => {
            state.loading = true
            state.status = 'loading'
            state.isError = false
        })
        .addCase(getMatchups.rejected, (state, action) => {
            state.loading = false
            state.status = 'failed'
            state.isError = true
        })
        .addCase(deleteSingleMatchup.fulfilled, (state) => {
            state.loading = false
            state.status = 'success'
            state.isError = false
        })
    }
})

export const selectMatchups = (state: RootState) => state.matchupReducer
export default matchupFeedSlice.reducer
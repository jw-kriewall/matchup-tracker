import { createSlice } from "@reduxjs/toolkit";
import { Matchup } from "../types/Matchup";

export interface MatchupFeedState {
    matchups: Matchup[] | undefined,
    loading: boolean
}

const initialState: MatchupFeedState = {
    matchups: [],
    loading: false
}

// export interface ActionT {
//     action: string,
//     payload: any
// }

const matchupFeedSlice = createSlice({
    name: 'matchup',
    initialState,
    reducers: {
        addToMatchups: (state, action) => {
            state.matchups?.push(action.payload)
        },
        removeFromMatchups: (state, action) => {
            const matchupIndex = state.matchups?.indexOf(action.payload)
            if (matchupIndex) {
                state.matchups?.splice(matchupIndex, 1)
            }
        }
    }
})

// const { actions: matchupActions, reducer: matchupReducer } = matchupFeedSlice

export default matchupFeedSlice
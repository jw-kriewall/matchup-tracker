import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import matchupFeedSlice from '../redux/MatchupFeedSlice';
import userAuthSlice from '../redux/UserSlice';
import { AnyAction } from 'redux';

// export interface MatchupTrackerState {
//   user: User | null | undefined
//   matchupArray: Matchup[] | undefined
// }

// const initialState: MatchupTrackerState = {
//   user: null,
//   matchupArray: []
// }

// const userReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//       case 'LOGIN':
//         return { ...state, user: action.payload };
//       case 'LOGOUT':
//         return { ...state, user: null };
//       default:
//         return state;
//     }
//   };

// const matchupReducer = (state = initialState, action: any) => {
//   switch(action.type) {
//     case 'ADD_MATCHUP':
//       return { ...state, matchupArray:  action.payload }
//   }
// }

export const store = configureStore({
  reducer: {
    userReducer: userAuthSlice.reducer,
    matchupReducer: matchupFeedSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

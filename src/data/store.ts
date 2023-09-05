import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import matchupFeedReducer from '../redux/MatchupFeedSlice';
import userAuthSlice from '../redux/UserSlice';
import { AnyAction } from 'redux';
import { Matchup } from '../types/Matchup';

export const store = configureStore({
  reducer: {
    userReducer: userAuthSlice.reducer,
    matchupReducer: matchupFeedReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<Matchup, RootState, unknown, Action<string>>;
// AsyncThunkAction<Response | undefined, Matchup, {}>
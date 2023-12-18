import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import matchupFeedReducer from '../redux/MatchupFeedSlice';
import userAuthReducer from '../redux/UserSlice';
import { Matchup } from '../types/MatchupModels';

export const store = configureStore({
  reducer: {
    userReducer: userAuthReducer,
    matchupReducer: matchupFeedReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<Matchup, RootState, unknown, Action<string>>;
// AsyncThunkAction<Response | undefined, Matchup, {}>
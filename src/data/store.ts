import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import matchupFeedReducer from '../redux/MatchupFeedSlice';
import userAuthReducer from '../redux/UserSlice';
import { Matchup } from '../types/MatchupModels';
import TableDataReducer from '../redux/TableDataSlice';
import MatchupCountSlice from '../redux/MatchupCountSlice';

export const store = configureStore({
  reducer: {
    userReducer: userAuthReducer,
    matchupReducer: matchupFeedReducer,
    tableDataReducer: TableDataReducer,
    matchupCountSlice: MatchupCountSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<Matchup, RootState, unknown, Action<string>>;
// AsyncThunkAction<Response | undefined, Matchup, {}>
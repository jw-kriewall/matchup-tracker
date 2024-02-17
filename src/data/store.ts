import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { Matchup } from '../types/MatchupModels';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import matchupFeedReducer from '../redux/MatchupFeedSlice';
import userAuthReducer from '../redux/UserSlice';
import tableDataReducer from '../redux/TableDataSlice';
import matchupCountSlice from '../redux/MatchupCountSlice';

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can choose to only persist specific reducers
  whitelist: ['tableDataReducer', 'matchupFeedReducer'],
};

const rootReducer = combineReducers({
  userReducer: userAuthReducer,
  matchupReducer: matchupFeedReducer,
  tableDataReducer: tableDataReducer,
  matchupCountSlice: matchupCountSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware and other store enhancers can go here
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<Matchup, RootState, unknown, Action<string>>;
// AsyncThunkAction<Response | undefined, Matchup, {}>
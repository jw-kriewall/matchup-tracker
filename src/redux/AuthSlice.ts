// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { refreshTokenAction } from '../apiCalls/oauth2/refreshTokenAction';

interface OAuthState {
    accessToken: null | string;
    refreshToken: null | string;
    loading: boolean;
    error: null | string;
}

const initialState: OAuthState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: '' ,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // You can add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshTokenAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.loading = false;
      })
      .addCase(refreshTokenAction.rejected, (state, action) => {
        state.error = "Failed to reauthenticate";
        state.loading = false;
      });
  },
});

export default authSlice.reducer;

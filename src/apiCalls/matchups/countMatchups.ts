import { CredentialResponse } from '@react-oauth/google';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const countMatchups = createAsyncThunk(
  "matchups/count",
  async ({ user, deckNames }: { user: CredentialResponse | undefined; deckNames: string[] }) => {
    try {
      const response = await axios({
        url: `${apiUrl}/matchups/count`,
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': "*",
          "Access-Control-Allow-Methods": "GET, POST",
          Authorization: "Bearer " + user?.credential,
        },
        params: { deckNames },
      })
      const data = await response.data;
      return data
    } catch (error) {
      console.error('Error in count matchups thunk' + error)
      throw error
    }
  }
);
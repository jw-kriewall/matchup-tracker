import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleDataJson } from "../../types/GoogleDataJson";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

// This action creator function dispatches actions based on the API call result
export const refreshTokenAction = createAsyncThunk(
	"user/refreshToken",
	async (token: GoogleDataJson, { rejectWithValue }) => {
		
		try {
			const response = await axios.post(
				`${apiUrl}/api/${version}/refresh-token`,
				{
					refreshToken: token.refresh_token,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token.id_token,
					},
				}
			);

			const googleResponseToken: GoogleDataJson = response.data;

			console.log("DATA refresh-2: ", googleResponseToken);
			return googleResponseToken;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// Handling Axios errors specifically
				console.error("Error refreshing token:", error.response?.data);
				// Use 'rejectWithValue' to return a custom payload for the rejected action
				return rejectWithValue(error.response?.data || "Unknown error");
			} else {
				// Handle non-Axios errors
				console.error("Error refreshing token:", error);
				return rejectWithValue("Unknown error");
			}
		}
	}
);

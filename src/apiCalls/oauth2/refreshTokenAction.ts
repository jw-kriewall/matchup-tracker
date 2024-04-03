import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

interface RefreshTokenPayload {
	userToken: string;
	refreshToken: string;
}

// This action creator function dispatches actions based on the API call result
export const refreshTokenAction = createAsyncThunk(
	"user/refreshToken",
	async (
		{ userToken, refreshToken }: RefreshTokenPayload,
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post(
				`${apiUrl}/api/${version}/refresh-token`,
				{
					refreshToken: refreshToken,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + userToken,
					},
				}
			);
			const googleResponseToken: GoogleDataJson = response.data;

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

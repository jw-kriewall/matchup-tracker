import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import jwt_decode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

// This action creator function dispatches actions based on the API call result
export const refreshTokenAction = createAsyncThunk(
	"user/refreshToken",
	async (token: string, { rejectWithValue }) => {
		try {
			// Using Axios for the POST request
			const response: GoogleDataJson = await axios.post(
				`${apiUrl}/api/${version}/refresh-token`,
				{
					refreshToken: token, // Assuming the backend expects a JSON with the JWT for refreshing
				}
			);

			// Assuming the backend response includes the new access and refresh tokens directly
			// and that response structure matches GoogleDataJson (adjust accordingly)
			console.log("DATA refresh-2: ", response);

			// Decode the new JWT to extract user data or other info if needed
			const decodedToken: DecodedJwtToken = jwt_decode(response.id_token);

			// Return the new tokens; adjust according to actual response structure
			return {
				accessToken: response.access_token, // Adjust based on actual response
				refreshToken: response.refresh_token, // Adjust based on actual response
				// Including decodedToken in the return value if you need to use it
				decodedToken,
			};
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

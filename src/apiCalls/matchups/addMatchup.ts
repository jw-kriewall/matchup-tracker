import axios from "axios";
import { Matchup } from "../../types/MatchupModels";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const addNewMatchup = createAsyncThunk(
	"matchups/Add",
	async ({ userToken, matchup }: { userToken: string; matchup: Matchup }) => {
		try {
			const response = await axios.post(
				`${apiUrl}/api/${version}/matchups/add`,
				matchup,
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

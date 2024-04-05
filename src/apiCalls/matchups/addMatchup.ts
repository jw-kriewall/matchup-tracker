import { Matchup } from "../../types/MatchupModels";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const addNewMatchup = createAsyncThunk(
	"matchups/Add",
	async ({ userToken, matchup }: { userToken: string; matchup: Matchup }) => {
		try {
			const response = await fetch(`${apiUrl}/api/${version}/matchups/add`, {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + userToken,
				},
				body: JSON.stringify(matchup),
			});
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

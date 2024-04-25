import { createAsyncThunk } from "@reduxjs/toolkit";
import { Matchup } from "../../types/MatchupModels";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const deleteSingleMatchup = createAsyncThunk(
	"matchups/delete",
	async ({
		userToken,
		matchup,
	}: {
		userToken: string | undefined;
		matchup: Matchup;
	}) => {
		try {
			await axios({
				url: `${apiUrl}/api/${version}/matchups/delete/${matchup.id}`,
				method: "DELETE",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "DELETE",
					Authorization: `Bearer ${userToken}`,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

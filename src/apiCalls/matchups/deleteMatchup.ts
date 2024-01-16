import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Matchup } from "../../types/MatchupModels";
import { CredentialResponse } from "@react-oauth/google";

const apiUrl = process.env.REACT_APP_API_URL;

export const deleteSingleMatchup = createAsyncThunk(
	"matchups/delete",
	async ({
		user,
		matchup,
	}: {
		user: CredentialResponse | undefined;
		matchup: Matchup;
	}) => {
		try {
			await axios({
				url: `${apiUrl}/matchups/delete/${matchup.id}`,
				method: "DELETE",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "DELETE",
					Authorization: "Bearer " + user?.credential,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

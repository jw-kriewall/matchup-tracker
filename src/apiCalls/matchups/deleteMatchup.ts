import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Matchup } from "../../types/MatchupModels";
import { CredentialResponse } from "@react-oauth/google";
import { GoogleDataJson } from "../../types/GoogleDataJson";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const deleteSingleMatchup = createAsyncThunk(
	"matchups/delete",
	async ({
		user,
		matchup,
	}: {
		user: GoogleDataJson | undefined;
		matchup: Matchup;
	}) => {
		try {
			await axios({
				url: `${apiUrl}/api/${version}/matchups/delete/${matchup.id}`,
				method: "DELETE",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "DELETE",
					Authorization: "Bearer " + user?.id_token,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

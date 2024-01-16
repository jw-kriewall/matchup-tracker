import { CredentialResponse } from "@react-oauth/google";
import { Matchup } from "../../types/MatchupModels";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;

export const addNewMatchup = createAsyncThunk(
	"matchups/Add",
	async ({
		user,
		matchup,
	}: {
		user: CredentialResponse | undefined;
		matchup: Matchup;
	}) => {
		try {
			const response = await fetch(`${apiUrl}/matchups/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + user?.credential,
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

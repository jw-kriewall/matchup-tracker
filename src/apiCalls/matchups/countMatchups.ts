import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const countMatchups = createAsyncThunk(
	"matchups/count",
	async ({
		user,
		deckNames,
	}: {
		user: string | undefined;
		deckNames: string[];
	}) => {
		try {
			const response = await axios({
				url: `${apiUrl}/api/${version}/matchups/count`,
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET",
					Authorization: "Bearer " + user,
				},
				params: { deckNames },
			});
			const data = await response.data;
			return data;
		} catch (error) {
			console.error("Error in count matchups thunk" + error);
			throw error;
		}
	}
);

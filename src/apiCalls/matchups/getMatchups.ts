import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const getMatchups = createAsyncThunk(
	"matchups/get",
	async ({
		userToken,
		format,
	}: {
		userToken: string | undefined;
		format: string;
	}) => {
		try {
			const response = await axios({
				url: `${apiUrl}/api/${version}/matchups/${format}`,
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET",
					Authorization: "Bearer " + userToken,
				},
			});
			const data = await response.data;
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

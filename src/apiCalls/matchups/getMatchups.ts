import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleDataJson } from "../../types/GoogleDataJson";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const getMatchups = createAsyncThunk(
	"matchups/get",
	async ({
		user,
		format,
	}: {
		user: GoogleDataJson | undefined;
		format: string;
	}) => {
		try {
			const response = await axios({
				url: `${apiUrl}/api/${version}/matchups/${format}`,
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET",
					Authorization: "Bearer " + user?.id_token,
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

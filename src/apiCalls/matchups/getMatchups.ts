import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const getMatchups = createAsyncThunk(
	"matchups/get",
	async (user: CredentialResponse | undefined) => {
		try {
			const response = await axios({
				url: `${apiUrl}/api/${version}/matchups`,
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET",
					Authorization: "Bearer " + user?.credential,
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const getUserDeckDisplay = createAsyncThunk(
	"userDeckDisplay/get",
	async (user: GoogleDataJson | undefined) => {
		try {
			const response = await axios({
				url: `${apiUrl}/api/${version}/user/deckdisplays`,
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

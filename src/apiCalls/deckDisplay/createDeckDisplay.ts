import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeckDisplay } from "../../types/MatchupModels";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const createDeckDisplay = createAsyncThunk(
	"deckDisplay/create",
	async ({
		userToken,
		deckDisplay,
	}: {
		userToken: string | undefined;
		deckDisplay: DeckDisplay;
	}) => {
		try {
			const response = await axios.post(
				`${apiUrl}/api/${version}/user/deckdisplays/add`, 
                deckDisplay,
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET",
						Authorization: `Bearer ${userToken}`,
					},
				}	
			);
			const data = await response.data;
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

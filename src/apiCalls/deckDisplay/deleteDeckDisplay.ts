import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const deleteDeckDisplay = createAsyncThunk(
	"deckDisplay/delete",
	async ({ userToken, id }: { userToken: string | undefined; id: number }) => {
		try {
			await axios({
				url: `${apiUrl}/api/${version}/deckdisplays/delete/${id}`,
				method: "DELETE",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "DELETE",
					Authorization: `Bearer ${userToken}`,
				},
			});
			return id;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const getUserRole = createAsyncThunk(
	"user/getRole",
	async (token: DecodedJwtToken) => {
		try {
			if (token) {
				const email = token.email;
				const username = token.name;
				const response = await axios.post(
					`${apiUrl}/api/${version}/user/role`,
					{ email: email, username: username },
					{
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods": "POST",
							Authorization: "Bearer " + token,
						},
					}
				);
				const role = response.data;
				return role;
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

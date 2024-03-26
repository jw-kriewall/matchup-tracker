import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import jwt_decode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export const getUserRole = createAsyncThunk(
	"user/getRole",
	async (token: GoogleDataJson) => {
		try {
			if (token) {
				const decodedToken: DecodedJwtToken = jwt_decode(token.id_token); 
				const email = decodedToken.email;
				const username = decodedToken.name;
				const response = await axios.post(
					`${apiUrl}/api/${version}/user/role`,
					{ email: email, username: username },
					{
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods": "POST",
							Authorization: "Bearer " + token.id_token,
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

import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";

const apiUrl = process.env.REACT_APP_API_URL;

export const getUserRole = createAsyncThunk(
	"user/getRole",
	async (user: CredentialResponse) => {
		try {
			if (user.credential) {
				const decodedToken: DecodedJwtToken = jwt_decode(user.credential);
				const email = decodedToken.email;
				const username = decodedToken.name;
				const response = await axios.post(
					`${apiUrl}/api/user/role`,
					{ email: email, username: username },
					{
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods": "POST",
							Authorization: "Bearer " + user?.credential,
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

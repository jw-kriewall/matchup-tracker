import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
//const apiUrl = "https://matchuptracker-production.up.railway.app";

export const getMatchups = createAsyncThunk(
    "matchups/get",
    async(user: CredentialResponse | undefined) => {
        console.log('API URL:', apiUrl);
        try {
            const response = await axios({
                url: `${apiUrl}/matchups/getAll`,
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': "*",
                    "Access-Control-Allow-Methods": "GET, POST",
                    Authorization: "Bearer " + user?.credential,
                },
            })
            const data = await response.data;
            return data               
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)
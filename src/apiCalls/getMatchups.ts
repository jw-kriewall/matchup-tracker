import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMatchups = createAsyncThunk(
    "matchups/get",
    // TODO: can I pass entire GoogleOAuth response object instead of token?
    async(user: CredentialResponse | undefined) => {
        try {
            const response = await axios({
                url:"http://localhost:8090/matchups/getAll",
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
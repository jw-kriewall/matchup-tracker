// http://localhost:{{port}}/matchups/individual/Pikachu

import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const apiUrl = "http://localhost:8090";
const apiUrl = process.env.REACT_APP_API_URL;

export const getMatchupRecordsByDeck = createAsyncThunk(
    "tableData/getAllRecords",
    async({ user }: { user: CredentialResponse | undefined }) => {
        try {
            const response = await axios({
                url: `${apiUrl}/matchups/getAllRecords`,
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
// http://localhost:{{port}}/matchups/individual/Pikachu

import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8090";

export const getMatchupRecordsByDeck = createAsyncThunk(
    "tableData/getAllRecords",
    async({ user }: { user: CredentialResponse | undefined }) => {
        try {
            const response = await axios({
                url: `${API_URL}/matchups/getAllRecords`,
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
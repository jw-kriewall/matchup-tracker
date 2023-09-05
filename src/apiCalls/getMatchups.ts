import { createAsyncThunk } from "@reduxjs/toolkit";
import { async } from "q";
import { User } from "../types/Matchup";
import axios from "axios";

export const getMatchups = createAsyncThunk(
    "matchups/get",
    async(token: string) => {
        try {
            const response = await axios({
                url:"http://localhost:8090/matchups/getAll",
                method: "GET",
                headers: {	
                    'Access-Control-Allow-Origin': "*",
                    "Access-Control-Allow-Methods": "GET, POST",
                    Authorization: "Bearer " + token,
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
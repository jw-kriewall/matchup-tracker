import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Matchup } from "../../types/MatchupModels";
import { store } from "../../data/store";
import { getMatchups } from "./getMatchups";
import { CredentialResponse } from "@react-oauth/google";

const apiUrl = process.env.REACT_APP_API_URL;
//const apiUrl = "https://matchuptracker-production.up.railway.app";

export const deleteSingleMatchup = createAsyncThunk(
    "matchups/delete",
    async(matchup: Matchup) => {
        try {
            const response = await axios.delete(`${apiUrl}/matchups/delete/` + matchup.id)

            if (response.status >= 200 && response.status < 300 ) {
            let oauth: CredentialResponse = JSON.parse(localStorage.getItem("user")!)
			store.dispatch(getMatchups(oauth))
            }
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }
)
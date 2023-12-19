import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Matchup } from "../../types/MatchupModels";
import { store } from "../../data/store";
import { getMatchups } from "./getMatchups";
import { CredentialResponse } from "@react-oauth/google";

export const deleteSingleMatchup = createAsyncThunk(
    "matchups/delete",
    async(matchup: Matchup) => {
        try {
            const response = await axios.delete("http://localhost:8090/matchups/delete/" + matchup.id)

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
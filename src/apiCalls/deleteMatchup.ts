import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Matchup } from "../types/Matchup";
import { OAuth2Response } from "../types/OAuth2Response";
import { store } from "../data/store";
import { getMatchups } from "./getMatchups";

export const deleteSingleMatchup = createAsyncThunk(
    "matchups/delete",
    async(matchup: Matchup) => {
        let token = ''
        try {
            const response = await axios.delete("http://localhost:8090/matchups/delete/" + matchup.id)

            if (response.status >= 200 && response.status < 300 ) {
            let oauth: OAuth2Response = JSON.parse(localStorage.getItem("user")!)
			token = oauth.credential
			store.dispatch(getMatchups(token))
            }
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }
)
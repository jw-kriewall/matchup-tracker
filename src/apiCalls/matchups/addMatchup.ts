import { Matchup } from "../../types/MatchupModels";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
//const apiUrl = "https://matchuptracker-production.up.railway.app";

export const addNewMatchup = createAsyncThunk(
    "matchups/Add",
    // @TODO: doesn't this endpoint need authorization too?
    async (matchup: Matchup) => {
        try {
            const response = await fetch(`${apiUrl}/matchups/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(matchup)
            })
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)
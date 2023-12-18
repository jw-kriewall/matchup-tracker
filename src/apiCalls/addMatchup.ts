import { response } from "express";
import { Matchup } from "../types/MatchupModels";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewMatchup = createAsyncThunk(
    "matchups/Add",
    // @TODO: doesn't this endpoint need authorization too?
    async (matchup: Matchup) => {
        try {
            const response = await fetch("http://localhost:8090/matchups/add", {
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
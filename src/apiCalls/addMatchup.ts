import { response } from "express";
import { Matchup } from "../types/Matchup";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewMatchup = createAsyncThunk(
    "matchups/Add",
    async (matchup: Matchup) => {
        try {
            const response = await fetch("http://localhost:8090/matchups/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(matchup)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
)
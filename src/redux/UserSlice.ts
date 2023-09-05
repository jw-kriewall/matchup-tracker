import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/Matchup";

let localUser = localStorage.getItem("user");
let user = null;
if(localUser !== null && localUser !== '') {
    user = JSON.parse(localUser) as User;
} 
// else {
//     user = new User();
// }

export interface UserState {
    user: User | null | undefined,
    isLoading: boolean,
    loginSuccess: boolean
}
  
const initialState: UserState = {
    user: user,
    isLoading: false,
    loginSuccess: user?.username ? true : false
}
  
const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        pending: (state, action) => {
            state.isLoading = true
        },
        login: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
        logout: (state) => {
            state.isLoading = false
            localStorage.removeItem("user")
        }
    }
})

export default userAuthSlice
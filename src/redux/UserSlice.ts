import { CredentialResponse } from "@react-oauth/google";
import { createSlice } from "@reduxjs/toolkit";

let localUser = localStorage.getItem("user");
let user = null;
if(localUser !== null && localUser !== '') {
    user = JSON.parse(localUser) as CredentialResponse;
} 
// else {
//     user = new User();
// }

export interface UserState {
    user: CredentialResponse | null | undefined,
    userLoading: boolean,
    loginSuccess: boolean,
    logoutTime: Date | undefined
}
  
const initialState: UserState = {
    user: user,
    userLoading: false,
    loginSuccess: user?.credential ? true : false,
    logoutTime: undefined
}

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        pending: (state, action) => {
            state.userLoading = true
        },
        login: (state, action) => {
            state.userLoading = false
            state.user = action.payload
            state.loginSuccess = state.user?.credential ? true : false
            state.logoutTime = new Date(new Date().getTime() + (60 * 60 * 1000));
        },
        logout: (state) => {
            state.userLoading = false
            state.user = null
            state.logoutTime = undefined
            localStorage.clear()
        }
    }
})

export default userAuthSlice.reducer
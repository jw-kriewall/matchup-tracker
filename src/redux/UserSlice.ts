import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserRole } from "../apiCalls/users/getUserRole";
import { GoogleDataJson } from "../types/GoogleDataJson";

interface UserWithRole extends GoogleDataJson {
	role: string;
}

export interface UserState {
	user: UserWithRole | null;
	userLoading: boolean;
	loginSuccess: boolean;
}

const initialState: UserState = {
	user: JSON.parse(localStorage.getItem("user") || "null"),
	// user: useCookies(["user"])
	userLoading: false,
	loginSuccess: false,
};

const userAuthSlice = createSlice({
	name: "userAuth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<UserWithRole>) => {
			state.userLoading = false;
			state.user = action.payload;
			state.loginSuccess = true;
		},
		logout: (state) => {
			state.userLoading = false;
			state.user = null;
			state.loginSuccess = false;
			localStorage.clear();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserRole.pending, (state) => {
				state.userLoading = true;
			})
			.addCase(getUserRole.fulfilled, (state, action) => {
				state.userLoading = false;
			})
			.addCase(getUserRole.rejected, (state) => {
				state.userLoading = false;
			});
	},
});

export const { login, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;

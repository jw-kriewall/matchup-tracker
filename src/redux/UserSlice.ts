import { CredentialResponse } from "@react-oauth/google";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserRole } from "../apiCalls/users/getUserRole";

interface UserWithRole extends CredentialResponse {
	role: string;
}

export interface UserState {
	user: UserWithRole | null;
	userLoading: boolean;
	loginSuccess: boolean;
	logoutTime: Date | undefined;
}

const initialState: UserState = {
	user: JSON.parse(localStorage.getItem("user") || "null"),
	userLoading: false,
	loginSuccess: false,
	logoutTime: undefined,
};

const userAuthSlice = createSlice({
	name: "userAuth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<UserWithRole>) => {
			state.userLoading = false;
			state.user = action.payload;
			state.loginSuccess = true;
			state.logoutTime = new Date(new Date().getTime() + 60 * 60 * 1000);
			// localStorage.setItem("user", JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.userLoading = false;
			state.user = null;
			state.logoutTime = undefined;
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
				console.log(action.payload);
				state.userLoading = false;
				if (state.user) {
					// state.user.role = action.payload;
					// Set a cookie with the user's role
					// createCookie("userRole", action.payload, 3600);
				}
				// console.log(document.cookie);
			})
			.addCase(getUserRole.rejected, (state) => {
				state.userLoading = false;
			});
	},
});

export const { login, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;

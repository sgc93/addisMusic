import { createSlice } from "@reduxjs/toolkit";

// initialize state
const initialState = {
	isLoading: false,
	error: null,
	isUserLoggedIn: false,
	user: {},
	userData: null,
};

// define slice with name, initial state and list of reducers
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		checkSignIn(state) {
			state.isLoading = true;
			state.error = null;
		},
		checkSignInSuccess(state, action) {
			state.user = action.payload;
			state.isLoading = false;
		},
		checkSignInFailure(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

// export slice actions
export const { checkSignIn, checkSignInSuccess, checkSignInFailure } =
	authSlice.actions;

// export slice reducer
export default authSlice.reducer;

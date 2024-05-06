import { createSlice } from "@reduxjs/toolkit";

// initialize state
const initialState = {
	isLoading: false,
	error: null,
};

// define slice with name, initial state and list of reducers
export const authSlice = createSlice({
	name: "authCheck",
	initialState,
	reducers: {
		checkSignIn(state, action) {
			state.isLoading = true;
			state.error = null;
		},
		checkSignInSuccess(state) {
			state.isLoading = false;
		},
		checkSignInFailure(state, action) {
			state.isLoading = false;
			state.error = action;
		},
	},
});

// export slice actions
export const { checkSignIn, checkSignInSuccess, checkSignInFailure } =
	authSlice.actions;

// export slice reducer
export default authSlice.reducer;

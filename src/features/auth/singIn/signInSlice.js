import { createSlice } from "@reduxjs/toolkit";

// initialize state
const initialState = {
	isLoading: false,
	error: null,
	isSignInShown: false,
	isResetSuccess: null,
};

// define slice with name, initial state and list of reducers
export const signInSlice = createSlice({
	name: "signInCheck",
	initialState,
	reducers: {
		checkSignIn(state) {
			state.isLoading = true;
			state.error = null;
		},
		checkSignInReset(state) {
			state.isLoading = true;
			state.error = null;
		},
		checkSignInSuccess(state) {
			state.isLoading = false;
		},
		checkSignInResetSuccess(state, action) {
			state.isResetSuccess = action.payload;
			state.error = null;
		},
		checkSignInFailure(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		checkSignInOpen(state) {
			state.error = "";
			state.isSignInShown = !state.isSignInShown;
		},
	},
});

// export slice actions
export const {
	checkSignIn,
	checkSignInReset,
	checkSignInSuccess,
	checkSignInResetSuccess,
	checkSignInFailure,
	checkSignInOpen,
} = signInSlice.actions;

// export slice reducer
export default signInSlice.reducer;

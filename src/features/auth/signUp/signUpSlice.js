import { createSlice } from "@reduxjs/toolkit";

// initialize state
const initialState = {
	isLoading: false,
	error: null,
	isSignUpShown: false,
};

// define slice with name, initial state and list of reducers
export const signUpSlice = createSlice({
	name: "signUpCheck",
	initialState,
	reducers: {
		checkSingUp(state) {
			state.isLoading = true;
			state.error = null;
		},
		checkSingUpSuccess(state) {
			state.isLoading = false;
			state.isSignUpShown = false;
		},
		checkSingUpFailure(state, action) {
			state.isLoading = false;
			state.error = action;
		},
		checkSignUpOpen(state) {
			state.isSignUpShown = !state.isSignUpShown;
		},
	},
});

// export slice actions
export const {
	checkSignUp,
	checkSignUpSuccess,
	checkSignUpFailure,
	checkSignUpOpen,
} = signUpSlice.actions;

// export slice reducer
export default signUpSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	publicSongs: null,
	isLoading: false,
	error: "",
};

const publicSongsSlice = createSlice({
	name: "public",
	initialState,
	reducers: {
		publicLoad(state) {
			state.error = "";
			state.isLoading = true;
		},
		publicLoadSuccess(state, action) {
			state.error = "";
			state.isLoading = false;
			state.publicSongs = action.payload;
		},
		publicLoadFailure(state, action) {
			state.error = "";
			state.isLoading = false;
			state.error = action.payload;
		},
		publicLoadUpdate(state, action) {
			state.publicSongs = action.payload;
		},
	},
});

export const {
	publicLoad,
	publicLoadSuccess,
	publicLoadFailure,
	publicLoadUpdate,
} = publicSongsSlice.actions;

export default publicSongsSlice.reducer;

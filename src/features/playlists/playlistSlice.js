import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allPlaylists: [],
	error: "",
	isLoading: false,
};

const playListSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		playlistLoad(state) {
			state.error = "";
			state.isLoading = true;
		},
		playlistLoadSuccess(state, action) {
			state.error = "";
			state.isLoading = false;
			state.allPlaylists = action.payload;
		},
		playlistLoadFailure(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { playlistLoad, playlistLoadSuccess, playlistLoadFailure } =
	playListSlice.reducer;

export default playListSlice.actions;

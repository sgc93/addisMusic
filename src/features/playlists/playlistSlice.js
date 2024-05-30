import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allPlaylists: [],
	error: "",
	isLoading: false,
	isUpdating: false,
	updateError: "",
	isUpdated: false,
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
			console.log(action.payload);

			state.error = "";
			state.isLoading = false;
			state.allPlaylists = action.payload;
		},
		playlistLoadFailure(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
		playlistAdd(state) {
			state.updateError = "";
			state.isUpdated = false;
			state.isUpdating = true;
		},
		playlistAddSuccess(state, action) {
			state.updateError = "";
			state.isUpdating = false;
			state.allPlaylists = action.payload;
			state.isUpdated = true;
		},
		playlistAddClose(state) {
			state.isUpdated = false;
		},
		playlistAddFailure(state, action) {
			state.isUpdating = false;
			state.updateError = action.payload;
		},
	},
});

export const {
	playlistLoad,
	playlistLoadSuccess,
	playlistLoadFailure,
	playlistAdd,
	playlistAddSuccess,
	playlistAddClose,
	playlistAddFailure,
} = playListSlice.actions;

export default playListSlice.reducer;

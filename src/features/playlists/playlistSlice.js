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
		playlistUpdate(state) {
			state.updateError = "";
			state.isUpdated = false;
			state.isUpdating = true;
		},
		playlistUpdateSuccess(state, action) {
			state.updateError = "";
			state.isUpdating = false;
			state.allPlaylists = action.payload;
			state.isUpdated = true;
		},
		playlistUpdateClose(state) {
			state.isUpdated = false;
		},
		playlistUpdateFailure(state, action) {
			state.isUpdating = false;
			state.updateError = action.payload;
		},
	},
});

export const {
	playlistLoad,
	playlistLoadSuccess,
	playlistLoadFailure,
	playlistUpdate,
	playlistUpdateSuccess,
	playlistUpdateClose,
	playlistUpdateFailure,
} = playListSlice.actions;

export default playListSlice.reducer;

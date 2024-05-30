import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allPlaylists: [],
	error: "",
	isLoading: false,
	isUpdating: false,
	updateError: "",
	isUpdated: false,
	selectedPlaylist: null,
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
		playlistSelect(state, action) {
			state.selectedPlaylist = action.payload;
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
		playlistReset(state) {
			state.isUpdated = false;
			state.isLoading = false;
			state.isUpdated = false;
			state.updateError = "";
			state.error = "";
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
	playlistReset,
	playlistSelect,
} = playListSlice.actions;

export default playListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allPlaylists: null,
	allFavorites: null,
	allSongs: null,
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
			state.allPlaylists = action.payload.allPlaylists;
			state.allFavorites = action.payload.allFavorites;
			state.allSongs = action.payload.allSongs;
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
		playlistUpdateAll(state, action) {
			state.allPlaylists = action.payload;
		},
		playlistUpdateFavorite(state, action) {
			state.allFavorites = action.payload;
		},
		playlistUpdateSong(state, action) {
			state.allSongs = action.payload;
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
	playlistUpdateAll,
	playlistUpdateFavorite,
	playlistUpdateSong,
} = playListSlice.actions;

export default playListSlice.reducer;

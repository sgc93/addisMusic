import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allPlaylists: [],
	error: "",
	isLoading: false,
	isAdding: false,
	addError: "",
	isPlaylistAdded: false,
	isDeleting: false,
	deleteError: "",
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
			state.addError = "";
			state.isPlaylistAdded = false;
			state.isAdding = true;
		},
		playlistAddSuccess(state, action) {
			console.log(action);
			state.addError = "";
			state.isAdding = false;
			state.allPlaylists = action.payload;
			state.isPlaylistAdded = true;
		},
		playlistAddFailure(state, action) {
			state.isAdding = false;
			state.addError = action.payload;
		},
	},
});

export const {
	playlistLoad,
	playlistLoadSuccess,
	playlistLoadFailure,
	playlistAdd,
	playlistAddSuccess,
	playlistAddFailure,
} = playListSlice.actions;

export default playListSlice.reducer;

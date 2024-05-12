import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "",
	createdAt: "",
	updatedAt: "",
	musics: [],
	isLoading: false,
	error: "",
	isPlayable: null,
};

const playListSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		playlistLoad(state, action) {
			state.error = "";
			state.isLoading = true;
		},
		playlistLoadUpload(state, action) {
			state.error = "";
			state.isLoading = true;
		},
		playlistLoadSuccess(state, action) {
			state.error = "";
			state.isLoading = false;
			state.name = action?.payload?.name;
			state.isPlayable = action.payload?.isPlayable;
			state.createdAt = action?.payload?.createdAt;
			state.updatedAt = action?.payload?.updatedAt;
			state.musics = action?.payload?.musics;
		},

		playlistLoadFailure(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const {
	playlistLoad,
	playlistLoadSuccess,
	playlistLoadFailure,
	playlistLoadUpload,
} = playListSlice.reducer;

export default playListSlice.actions;

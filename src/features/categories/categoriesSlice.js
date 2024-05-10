import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	albums: [],
	artists: [],
	tracks: [],
	isLoading: false,
	error: "",
};
const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		loadCategories(state) {
			state.isLoading = true;
			state.error = false;
		},
		loadCategoriesSuccess(state, action) {
			state.albums = action?.payload?.albums;
			state.artists = action?.payload?.artists;
			state.tracks = action?.payload?.tracks;
			state.isLoading = false;
		},
		loadCategoriesFailure(state, action) {
			state.isLoading = false;
			state.error = action?.payload;
		},
		loadCategoriesEnd(state) {
			state.isLoading = false;
		},
	},
});

export const {
	loadCategories,
	loadCategoriesSuccess,
	loadCategoriesFailure,
	loadCategoriesEnd,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;

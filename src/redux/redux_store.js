import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import signUpReducer from "../features/auth/signUp/signUpSlice";
import signInReducer from "../features/auth/singIn/signInSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import currMusicReducer from "../features/music/musicSlice";
import publicReducer from "../features/overview/publicSongsSlice";
import playlistReducer from "../features/playlists/playlistSlice";

export const saga = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		signUpCheck: signUpReducer,
		signInCheck: signInReducer,
		currMusic: currMusicReducer,
		categories: categoriesReducer,
		playlist: playlistReducer,
		public: publicReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

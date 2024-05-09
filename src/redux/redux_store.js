import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import signUpReducer from "../features/auth/signUp/signUpSlice";
import currMusicReducer from "../features/music/musicSlice";

export const saga = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		signUpCheck: signUpReducer,
		currMusic: currMusicReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

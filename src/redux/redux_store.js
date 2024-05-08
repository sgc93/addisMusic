import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import signUpReducer from "../features/auth/signUp/signUpSlice";

export const saga = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		signUpCheck: signUpReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

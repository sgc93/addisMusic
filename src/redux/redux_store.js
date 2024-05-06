import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../features/auth/authSlice";

export const saga = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		authCheck: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

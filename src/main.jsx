import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import App from "./App.jsx";
import authReducer from "./auth/authSlice.js";
import "./index.css";

const saga = createSagaMiddleware();

const store = configureStore({
	reducer: {
		authCheck: authReducer,
	},
	middleware: [saga],
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

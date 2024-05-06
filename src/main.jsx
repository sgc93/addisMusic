import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import authSaga from "./auth/authSaga.js";
import "./index.css";
import { saga, store } from "./redux/redux_store.js";

saga.run(authSaga);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

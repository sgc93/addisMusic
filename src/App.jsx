import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Album from "./features/categories/Album";
import Artist from "./features/categories/Artist";
import Track from "./features/categories/Track";
import Overview from "./features/overview/Overview";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

// defining routes
const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		children: [
			{
				path: "",
				element: <Overview />,
			},
			{
				path: "albums",
				element: <Album />,
			},
			{
				path: "artists",
				element: <Artist />,
			},
			{
				path: "tracks",
				element: <Track />,
			},
		],
	},
	{
		path: "auth",
		element: <AuthPage />,
	},
]);

function App() {
	return (
		<RouterProvider router={router}>
			<Outlet />
		</RouterProvider>
	);
}

export default App;

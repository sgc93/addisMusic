import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Album from "./features/categories/Album";
import Artist from "./features/categories/Artist";
import Track from "./features/categories/Track";
import Overview from "./features/overview/Overview";
import Favorite from "./features/user/Favorite";
import PlayList from "./features/user/PlayList";
import UserSong from "./features/user/UserSong";
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
			{
				path: "playlists",
				element: <PlayList />,
			},
			{
				path: "songs",
				element: <UserSong />,
			},
			{
				path: "favorites",
				element: <Favorite />,
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

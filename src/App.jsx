import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Album from "./features/categories/Album";
import Artist from "./features/categories/Artist";
import Track from "./features/categories/Track";
import Local from "./features/local/Local";
import Overview from "./features/overview/Overview";
import Search from "./features/search/Search";
import Favorite from "./features/user/Favorite";
import PlayList from "./features/user/PlayList";
import UserSong from "./features/user/UserSong";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

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
				path: "local",
				element: <Local />,
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
			{
				path: "search",
				element: <Search />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
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

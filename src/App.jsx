import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

// defining routes
const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
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

import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from "react-router-dom";

import AdminDashboard from './pages/AdminDashboard'

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/" element={< AdminDashboard />} />
			</Route>,
		),
		{ basename: "/admin-dashboard" },
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

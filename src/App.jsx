import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

import AdminDashboard from './pages/AdminDashboard';
import AdminAuth from "./pages/AdminAuth";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<AdminDashboard />}></Route>
					<Route path="/dashboard" element={< AdminDashboard />} />
				</Route>
				
				<Route path="/login" element={< AdminAuth />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;


import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
	);
	// const [user, setUser] = useState(() => Cookies.get("user"));
	const [token, setToken] = useState(Cookies.get("token") || null);
	// const [token, setToken] = useState(Cookies.get("token"));
	const [creators, setCreators] = useState([]);
	const [refetchHelp, setRefetchHelp] = useState(false);

	// FUNCTION TO REFETCH
	const handleRefetchHelp = () => {
		setRefetchHelp(!refetchHelp);
	};

	const handleChange = (user, token, creators) => {
		setUser(user);
		setToken(token);
		setCreators(creators);
	};

	const handleUser = (user) => {
		setUser(user);
	};

	useEffect(() => {
		// Storing user and token as JSON strings in cookies
		// Cookies.set("user", JSON.stringify(user));
		// Cookies.set("token", token);

		Cookies.set("user", JSON.stringify(user), { expires: 365 });
		Cookies.set("token", token, { expires: 365 });
	}, [user, token]);

	let contextData = {
		user: user,
		token: token,
		handleChange,
		handleUser,
		refetchHelp,
		handleRefetchHelp,

		// shouldKick,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

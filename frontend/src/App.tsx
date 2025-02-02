import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import { useThemestore } from "./store/useThemestore";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import PageNotFound from "./pages/PageNotFound";
import useUrlstore from "./store/useUrlstore";
import { Toaster } from "./components/ui/toaster";

function App() {
	const { getTheme } = useThemestore();
	const { isSignedIn, isLoaded } = useAuth();
	const { setUserid } = useUrlstore();
	const { userId } = useAuth();

	useEffect(() => {
		getTheme();
	}, [getTheme]);

	useEffect(() => {
		console.log("User set", userId);
		setUserid(userId);
	}, [userId, setUserid]);

	if (!isLoaded) return null;
	return (
		<>
			<Nav />
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route
					path="/dashboard"
					element={isSignedIn ? <Dashboard /> : <Navigate to="/" />}
				/>
				<Route
					path="/analytics/:short_url"
					element={isSignedIn ? <Analytics /> : <Navigate to="/" />}
				/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Toaster/>
		</>
	);
}

export default App;

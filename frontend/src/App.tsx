import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import { useThemestore } from "./store/useThemestore";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import useUrlstore from "./store/useUrlstore";
import { Toaster } from "./components/ui/toaster";
import Footer from "./components/footer";
import PageNotFound from "./pages/PageNotFound";

function App() {
	const { getTheme } = useThemestore();
	const { isSignedIn, isLoaded } = useAuth();
	const { setUserid } = useUrlstore();
	const { userId } = useAuth();

	useEffect(() => {
		getTheme();
	}, [getTheme]);

	useEffect(() => {
		setUserid(userId);
	}, [userId, setUserid]);

	if (!isLoaded) return null;
	return (
		<>
			<Nav />
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route
					path="page/dashboard"
					element={isSignedIn ? <Dashboard /> : <Navigate to="/" />}
				/>
				<Route
					path="page/analytics/:short_url"
					element={isSignedIn ? <Analytics /> : <Navigate to="/" />}
				/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer />
			<Toaster />
		</>
	);
}

export default App;

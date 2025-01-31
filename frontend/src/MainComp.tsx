import { StrictMode, useEffect } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { dark, experimental__simple, shadesOfPurple } from "@clerk/themes";
import { useThemestore } from "./store/useThemestore.ts";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const themes = {
	dark: dark,
	light: experimental__simple,
	system: shadesOfPurple,
};

export default function Main() {
	const { theme } = useThemestore();
	useEffect(() => {}, [theme]);
	return (
		<StrictMode>
			<BrowserRouter>
				<ClerkProvider
					publishableKey={PUBLISHABLE_KEY}
					appearance={{
						baseTheme: themes[theme],
					}}
				>
					<App />
				</ClerkProvider>
			</BrowserRouter>
		</StrictMode>
	);
}

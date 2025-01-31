import { create } from "zustand";

interface ThemeStore {
	theme: "light" | "dark" | "system";
	setTheme: (theme: "light" | "dark" | "system") => void;
	getTheme: () => void;
	applyTheme: () => void;
}

export const useThemestore = create<ThemeStore>((set, get) => ({
	theme: "system",
	applyTheme: () => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (get().theme === "system") {
			const systemTheme = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
		} else {
			root.classList.add(get().theme);
		}
	},
	getTheme: () => {
		const cacheTheme = localStorage.getItem("vite-ui-theme");
		if (cacheTheme && ["dark", "light", "system"].includes(cacheTheme)) {
			set({ theme: cacheTheme as "light" | "dark" | "system" });
		} else {
			localStorage.setItem("vite-ui-theme", "system");
			set({ theme: "system" });
		}
		get().applyTheme();
	},
	setTheme: (theme: "light" | "dark" | "system") => {
		set({ theme: theme });
		localStorage.setItem("vite-ui-theme", get().theme);
		get().applyTheme();
	},
}));

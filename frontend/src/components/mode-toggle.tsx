import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useThemestore } from "@/store/useThemestore";

function ToggleTheme() {
	const { theme, setTheme } = useThemestore();
	const handleChangeTheme = () => {
		if (theme === "light") setTheme("dark");
		else if (theme === "dark") setTheme("system");
		else if (theme === "system") setTheme("light");
	};
	return (
		<Button
			variant="ghost"
			onClick={handleChangeTheme}
			className="p-1"
			title={`${theme} color theme`}
		>
			{theme === "dark" ? (
				<Moon />
			) : theme === "light" ? (
				<Sun />
			) : (
				<Monitor />
			)}
		</Button>
	);
}

export default ToggleTheme;

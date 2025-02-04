import { Unlink } from "lucide-react";
import { H4 } from "@/components/Typography";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Userbutton from "./userbutton";
import { useNavigate } from "react-router-dom";

function Nav() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-between w-full h-16 gap-4 p-4">
			<div
				className="flex items-center gap-2 cursor-pointer"
				onClick={() => navigate("/")}
				title="go to homepage"
			>
				<Unlink strokeWidth={2} />
				<H4>QuickReach</H4>
			</div>
			<div className="flex items-center gap-2">
				<ModeToggle />
				<SignedIn>
					<Button
						variant="link"
						onClick={() => navigate("/page/dashboard")}
						className="hidden p-1 sm:grid"
					>
						Dashboard
					</Button>
					<Button variant="outline" className="p-0">
						<Userbutton />
					</Button>
				</SignedIn>
				<SignedOut>
					<SignInButton>
						<Button variant="outline">Sign In</Button>
					</SignInButton>
				</SignedOut>
			</div>
		</div>
	);
}

export default Nav;

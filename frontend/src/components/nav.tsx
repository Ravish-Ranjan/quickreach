import { Link } from "lucide-react";
import H4 from "./H4";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Userbutton from "./userbutton";
import { useNavigate } from "react-router-dom";

function Nav() {
	const navigate = useNavigate();
	return (
		<div className="w-full flex justify-between items-center h-12 p-4">
			<div
				className="flex gap-2 items-center cursor-pointer"
				onClick={() => navigate("/")}
				title="go to homepage"
			>
				<Link strokeWidth={2} />
				<H4>QuickReach</H4>
			</div>
			<div className="flex gap-2 items-center">
				<ModeToggle/>
				<SignedIn>
					<Button
						variant="link"
						onClick={() => navigate("/dashboard")}
						className="p-1"
					>
						Dashboard
					</Button>
					<Button variant="outline" className="p-0">
						<Userbutton />
					</Button>
				</SignedIn>
				<SignedOut>
					<SignInButton />
				</SignedOut>
			</div>
		</div>
	);
}

export default Nav;

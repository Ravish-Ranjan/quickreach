import { H1, Muted } from "@/components/Typography";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();
	return (
		<div className="p-8">
			<BackgroundBeams className="-z-10" />
			<div className="container flex flex-col items-center justify-center gap-2 mt-8 h-96 sm:mt-12">
				<H1>Tired of long urls?</H1>
				<Muted className="text-xl">
					No more long once, keep them short
				</Muted>
				<div className="flex gap-2 my-2">
					<SignedOut>
						<SignInButton>
							<Button variant="outline">Get Started</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<Button
							variant="outline"
							onClick={() => navigate("/page/dashboard")}
						>
							Go to Dashboard
						</Button>
					</SignedIn>
				</div>
			</div>
		</div>
	);
}

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function PageNotFound() {
	const navigate = useNavigate();

	return (
		<div className="h-screen w-full flex flex-col items-center justify-center gap-4">
			<h1 className="text-6xl font-bold">404</h1>
			<h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
			<p className="text-muted-foreground mb-8">
				The page you're looking for doesn't exist or has been moved.
			</p>

			<div className="flex gap-4">
				<Button onClick={() => navigate(-1)} variant="outline">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Go Back
				</Button>
				<Button onClick={() => navigate("/")}>
					<Home className="mr-2 h-4 w-4" />
					Home
				</Button>
			</div>
		</div>
	);
}

export default PageNotFound;

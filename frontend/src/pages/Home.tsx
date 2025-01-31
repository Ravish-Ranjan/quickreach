import { useAuth, useUser } from "@clerk/clerk-react";

export default function Home() {
	const { isLoaded, isSignedIn } = useAuth();
	const { user } = useUser();
	if (!isLoaded) return null;

	return isSignedIn ? (
		<div>Welcome {user?.firstName}</div>
	) : (
		<div>Please sign in</div>
	);
}

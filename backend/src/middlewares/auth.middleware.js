export const isAuthenticated = async (req, res, next) => {
	try {
		const authToken = req.headers.authorization;
		if (!authToken || !authToken.startsWith("Bearer "))
			return res.status(401).json({ message: "UnAuthenticated" });
		const token = authToken.split(" ")[1];
		if (!/^[a-zA-Z0-9_-]+$/.test(token)) {
			return res.status(401).json({ message: "Invalid userid" });
		}
		req.token = token;
		next();
	} catch (error) {
		console.log("Error checking authorization");
		return res.status(500).json({ message: error.message });
	}
};

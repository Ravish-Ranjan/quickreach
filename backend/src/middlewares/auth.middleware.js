export const isAuthenticated = async (req, res, next) => {
	try {
		const authToken = req.header["Authorization"];
		if (!authToken || authToken.startsWith("Bearer "))
			return res.status(401).json({ message: "UnAuthenticated" });
		const token = authToken.split(" ")[1];
		req.token = token;
		next();
	} catch (error) {
		console.log("Error checking authorization");
		return res.status(500).json({ message: error.message });
	}
};

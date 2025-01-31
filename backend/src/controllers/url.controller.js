export const handleReRoute = async (req, res) => {
	return res.status(200).json({ message: "rerouted" });
};

export const getMyUrls = async (req, res) => {
	return res.status(200).json({ message: "my urls fetched" });
};

export const getAnalytics = async (req, res) => {
	return res.status(200).json({ message: "analytics got" });
};

export const createUrl = async (req, res) => {
	return res.status(200).json({ message: "creates url" });
};

export const deleteUrl = async (req, res) => {
	return res.status(200).json({ message: "deleted url" });
};

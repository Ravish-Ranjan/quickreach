import Url from "../models/url.model.js";
import extractor from "../utils/extractKeywords.js";
import { customAlphabet } from "nanoid";

const limit = 10;
// TODO : make messages good

export const handleReRoute = async (req, res) => {
	try {
		const { short_url } = req.params;
		if (!short_url)
			return res.status(404).json({ message: "short url not found" });
		const url = await Url.findOne({ short_url });
		if (!url) return res.status(404).json({ message: "url not found" });

		const clickInfo = { ipaddress: req.ip };
		console.log(clickInfo);

		await Url.findOneAndUpdate(
			{ short_url },
			{
				$push: { clicks: clickInfo },
			}
		);
		res.redirect(url.original_url);
	} catch (error) {
		console.log("Error redirecting", error.message);
		return res.status(500).json({ message: "Server Error" });
	}
};

export const getMyUrls = async (req, res) => {
	try {
		const { page } = req.params;
		const user = req.token;
		const skip = (page - 1) * limit;
		const myUrls = await Url.find({ owner: user }, "-clicks")
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });
		const totalCount = await Url.find({ owner: user }).countDocuments();
		return res.status(200).json({
			currentPage: Number(page),
			totalPages: Math.ceil(totalCount / limit),
			totalCount,
			urls: myUrls,
		});
	} catch (error) {
		console.log("Error getting my urls", error.message);
		return res.status(500).json({ message: "Server Error" });
	}
};

export const getAnalytics = async (req, res) => {
	try {
		const { short_url } = req.params;
		const user = req.token;
		const url = await Url.findOne(
			{ short_url, owner: user },
			"original_url clicks short_url"
		);
		if (!url) return res.status(404).json({ message: "url not found" });
		return res.status(200).json(url);
	} catch (error) {
		console.log("Error getting analytics", error.message);
		return res.status(500).json({ message: "Server Error" });
	}
};

export const createUrl = async (req, res) => {
	try {
		const { original_url } = req.body;
		const user = req.token;
		if (!original_url) {
			return res
				.status(404)
				.json({ message: "Original urls is required" });
		}
		if (!user) {
			return res.status(401).json({ message: "UnAuthenticated" });
		}
		const regex =
			/^(https?|ftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}(\/[^\s]*)?$/;
		if (!regex.test(original_url)) {
			return res.status(401).json({ message: "Not a valid url" });
		}
		let newShortUrl;
		let existsprev = false;

		do {
			newShortUrl = extractor(original_url).join("-");
			const nanoid = customAlphabet(
				"abcdefghijklmnopqrstuvwxyz0123456789",
				3
			);
			newShortUrl += "-" + nanoid();
			const prevcount = await Url.find({
				short_url: newShortUrl,
			}).countDocuments();
			if (prevcount > 0) existsprev = true;
			else existsprev = false;
		} while (existsprev);

		const newUrl = new Url({
			original_url: original_url,
			owner: user,
			short_url: newShortUrl,
			createdAt: newShortUrl.createdAt,
			updatedAt: newShortUrl.updatedAt,
			clicks: newShortUrl.clicks,
			message: "Url created successfully",
		});
		await newUrl.save();

		return res.status(201).json(newUrl);
	} catch (error) {
		console.log("Error adding url", error.message);
		return res.status(500).json({ message: "Server Error" });
	}
};

export const deleteUrl = async (req, res) => {
	try {
		const { short_url } = req.params;
		const user = req.token;
		const url = await Url.findOne({ short_url, owner: user });
		if (!url) return res.status(404).json({ message: "url not found" });
		await Url.deleteOne({ short_url, owner: user });
		return res.status(200).json({ message: "url deleted" });
	} catch (error) {
		console.log("Error deleting url", error.message);
		return res.status(500).json({ message: "Server Error" });
	}
};

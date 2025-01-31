import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
	getMyUrls,
	getAnalytics,
	createUrl,
	deleteUrl,
} from "../controllers/url.controller.js";

const router = Router();

router.get("/myurls/:page", isAuthenticated, getMyUrls);
router.get("/analytics/:short_url", isAuthenticated, getAnalytics);
router.post("/new", isAuthenticated, createUrl);
router.delete("/delete/:short_url", isAuthenticated, deleteUrl);

export default router;

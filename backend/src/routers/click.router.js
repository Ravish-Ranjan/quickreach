import { Router } from "express";
import { handleReRoute } from "../controllers/url.controller.js";

const router = Router();

router.get("/:short_url", handleReRoute);

export default router;

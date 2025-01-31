import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./utils/connectDb.js";
import urlRouter from "./routers/url.router.js";
import clickRouter from "./routers/click.router.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:5173/",
		credentials: true,
	})
);
app.use("/url", urlRouter);
app.use("/", clickRouter);

app.listen(process.env.PORT || 8001, () => {
	console.log(`Backend Started at port ${process.env.PORT || 8001}`);
	connectDb(process.env.DATABASE_URL);
});

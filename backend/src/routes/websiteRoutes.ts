import { getWebsites } from "../controllers/websiteController";
import express from "express";

const router = express.Router();

router.get("/", getWebsites);

export default router;

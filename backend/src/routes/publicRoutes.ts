import { getPublic } from "../controllers/publicController";
import express from "express";

const router = express.Router();

router.get("/:websiteSlug", getPublic);
router.get("/:websiteSlug/p/:pageSlug", getPublic);

export default router;

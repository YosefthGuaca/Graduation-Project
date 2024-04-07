import { getPublic, createPublic } from "../controllers/publicController";
import express from "express";

const router = express.Router();

router.get("/:websiteSlug", getPublic);
router.get("/:websiteSlug/p/:pageSlug", getPublic);
router.post("/:websiteSlug", createPublic);
router.post("/:websiteSlug/p/:pageSlug", createPublic);

export default router;

import { getWebsites, createWebsite } from "../controllers/websiteController";
import { createPage, getPage, updatePage } from "../controllers/pageController";
import express from "express";

const router = express.Router();

router.get("/", getWebsites);
router.post("/", createWebsite);

router.get("/:websiteSlug/pages/:pageSlug", getPage);
router.post("/:websiteSlug/pages/:pageSlug", createPage);
router.patch("/:websiteSlug/pages/:pageSlug", updatePage);

export default router;

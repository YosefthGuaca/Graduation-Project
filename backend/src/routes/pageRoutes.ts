import { createPage, getPage, updatePage } from "../controllers/pageController";
import express from "express";

const router = express.Router();

router.get("/", getPage);

router.get("/:pageSlug", getPage);

router.post("/:pageSlug", createPage);

router.patch("/:pageSlug", updatePage);

export default router;

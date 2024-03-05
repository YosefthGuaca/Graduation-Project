import { createPage, getPage, updatePage } from "../controllers/projects";
import express from "express";

const router = express.Router();

router.get("/:id", getPage);

router.post("/:id", createPage);

router.patch("/:id", updatePage);

export default router;

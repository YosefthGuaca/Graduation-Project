import express from "express";
import { uploadUsersFromCsv } from "../controllers/csvController";

const router = express.Router();

router.post("/upload", uploadUsersFromCsv);

export default router;

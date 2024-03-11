import express from "express";
import { uploadUsersFromCsv } from "../controllers/csv";

const router = express.Router();

router.post("/upload", uploadUsersFromCsv);

export default router;

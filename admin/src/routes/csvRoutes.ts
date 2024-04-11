import express from "express";
import { csvController, uploadUsersFromCsv } from "../controllers/csvController";

// Initialize Express router
const router = express.Router();

router.post("/adduser", csvController);
router.post("/upload", uploadUsersFromCsv);


// Export the router
export default router;

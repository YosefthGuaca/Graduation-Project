import express from "express";
import { csvController, uploadUsersFromCsv } from "../controllers/csvController";

// Initialize Express router
const router = express.Router();

// Define routes
router.post("/adduser", csvController.post("/adduser"));
router.post("/upload", uploadUsersFromCsv);

// Export the router
export default router;

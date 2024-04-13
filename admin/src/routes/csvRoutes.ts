import express, { Request, Response } from "express";
import {
  csvController,
  uploadUsersFromCsv,
} from "../controllers/csvController";

// Initialize Express router
const router = express.Router();

router.use((req: Request, res: Response, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
});

router.post("/adduser", csvController);
router.post("/upload", uploadUsersFromCsv);

// Export the router
export default router;

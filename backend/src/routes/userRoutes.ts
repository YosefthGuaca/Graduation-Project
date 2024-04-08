import {
  login,
  logout,
  signup,
  getMyUser,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", getMyUser);

export default router;

import {
  login,
  logout,
  signup,
  getMyUser,
  updatePassword,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", getMyUser);

router.patch("/password", updatePassword);

export default router;

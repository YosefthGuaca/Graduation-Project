import { login, logout, signup } from "../controllers/usersController";
import express from "express";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;

import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.delete("/:userId", userController.deleteUser);

router.put("/edit", userController.updateUser);

export default router;

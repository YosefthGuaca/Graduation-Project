
import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// DELETE route to delete a user
router.delete("/:userId", userController.deleteUser);

export default  router;

import express, { Request, Response } from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.use((req: Request, res: Response, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
});

router.get("/", userController.getUsers);

router.delete("/:userId", userController.deleteUser);

router.put("/edit", userController.updateUser);

router.post("/:userId/email", userController.emailUser);

export default router;

import express from "express";
import cors from "cors";

const router = express.Router();

router.use(cors());
router.get("/cors-test", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

router.post("/cors-test", (req, res) => {
  res.status(201).json({ message: "Hello World!" });
});

router.delete("/cors-test", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

router.patch("/cors-test", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

router.put("/cors-test", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

export default router;

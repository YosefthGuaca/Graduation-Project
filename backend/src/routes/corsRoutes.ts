import express from "express";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.get("/api/cors-test", (req, res) => {
  res.send("GET request to /api/cors-test");
});

router.post("/api/cors-test", (req, res) => {
  res.send("POST request to /api/cors-test");
});

router.delete("/api/cors-test", (req, res) => {
  res.send("DELETE request to /api/cors-test");
});

router.patch("/api/cors-test", (req, res) => {
  res.send("PATCH request to /api/cors-test");
});

router.put("/api/cors-test", (req, res) => {
  res.send("PUT request to /api/cors-test");
});

export default router;

import express from "express";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.get("/app/:path*", (req, res) => {
  res.send("GET request to /app/:path*");
});

router.post("/app/:path*", (req, res) => {
  res.send("POST request to /app/:path*");
});

router.delete("/app/:path*", (req, res) => {
  res.send("DELETE request to /app/:path*");
});

router.patch("/app/:path*", (req, res) => {
  res.send("PATCH request to /app/:path*");
});

router.put("/app/:path*", (req, res) => {
  res.send("PUT request to /app/:path*");
});

export default router;

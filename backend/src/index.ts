import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import publicRoutes from "./routes/publicRoutes";
import userRoutes from "./routes/userRoutes";
import websiteRoutes from "./routes/websiteRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import cookieparser from "cookie-parser";
import passport from "passport";
import { session } from "./config/passport";

dotenv.config();
const app: Express = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET, POST, DELETE, PATCH, PUT, OPTIONS",
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.BACKEND_PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});
app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({ content: "Hello World!" });
});

app.use("/u", publicRoutes);
app.use("/api/users", userRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/auth", authRoutes);

const server = app.listen(port, () => {});
export default server;

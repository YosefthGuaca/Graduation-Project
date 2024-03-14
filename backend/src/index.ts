import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import corsRoutes from "./routes/corsRoutes";
import projectsRoutes from "./routes/projects";
import publicRoutes from "./routes/publicRoutes";
import cors from "cors";
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET, POST, DELETE, PATCH, PUT",
  allowedHeaders: ["Content-Type"],
};

dotenv.config();

const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());

const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

const server = app.listen(port);

app.use("/api", corsRoutes);
app.use("/projects", projectsRoutes);
app.use("/u", publicRoutes);

export default server;

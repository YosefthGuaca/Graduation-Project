import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import corsRoutes from "./routes/corsRoutes";
import projectsRoutes from "./routes/projectRoutes";
import publicRoutes from "./routes/publicRoutes";
import usersRoutes from "./routes/userRoutes";
import cors from "cors";
import cookieparser from "cookie-parser";
import passport from "passport";
import { session } from "./config/passport";
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use("/api", corsRoutes);
app.use("/projects", projectsRoutes);
app.use("/u", publicRoutes);
app.use("/api/users", usersRoutes);

const server = app.listen(port, () => {});
export default server;

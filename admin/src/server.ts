import express from "express";
import adminRouter from "./routes/adminRoutes";
import cookieparser from "cookie-parser";
import passport from "passport";
import { session } from "./config/passport";
import { PrismaClient } from "@prisma/client";
import csvRouter from "./routes/csvRoutes";

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use("/csv", csvRouter);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    const users = async () => {
      const users = await prisma.user.findMany().catch((error: Error) => {
        return res.status(500).json(error);
      });
      return res.render("./index.ejs", { users });
    };
    users();
  } else {
    return res.render("./login.ejs");
  }
});

app.get("/signup", (req: express.Request, res: express.Response) => {
  res.render("./signup.ejs");
});

app.get("/login", (req: express.Request, res: express.Response) => {
  res.render("./login.ejs");
});

app.use("/admin", adminRouter);

const server = app.listen(PORT, () => {});

export default server;

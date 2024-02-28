import express from "express";
import authRouter from "./routes/auth";
import cookieparser from "cookie-parser";
import passport from "passport";
import { session } from "./config/passport";
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    return res.render("./pages/index.ejs", { user: req.user });
  } else {
    return res.render("./pages/login.ejs");
  }
});

app.get("/signup", (req: express.Request, res: express.Response) => {
  res.render("./pages/signup.ejs");
});

app.get("/login", (req: express.Request, res: express.Response) => {
  res.render("./pages/login.ejs");
});

app.use("/auth", authRouter);

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

export default server;

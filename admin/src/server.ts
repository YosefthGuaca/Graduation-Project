import express from "express";
import adminRouter from "./routes/adminRoutes";
import cookieparser from "cookie-parser";
import passport from "passport";
import { session } from "./config/passport";
import { PrismaClient } from "@prisma/client";
import csvRoutes from "./routes/csvRoutes";
import userRoutes from "./routes/userRoutes";
interface User {
  id: number;
  email: string;
  username: string;
}
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.ADMIN_PORT || 8000;

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
      prisma.user.findMany()
      .then((users: User[]) => {  
          const userCount = users.length;
          res.render("./index.ejs", { users, userCount });
      })
      .catch((error: Error) => {
          console.error("Failed to fetch users:", error);
          res.status(500).json({ message: "Error fetching users from database", error });
      });
  } else {
      res.render("./login.ejs");
  }
});

app.use("/users", userRoutes);
app.use("/csv", csvRoutes);
app.use("/admin", adminRouter);

const server = app.listen(PORT, () => {});
export default server;

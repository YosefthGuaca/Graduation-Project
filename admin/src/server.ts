import express from "express";
import adminRouter from "./routes/adminRoutes";
import cookieparser from "cookie-parser";
import passport from "passport";
import { session } from "./config/passport";
import { PrismaClient } from "@prisma/client";
import csvRoutes from "./routes/csvRoutes";
import userRoutes from "./routes/userRoutes";
import methodOverride from "method-override";
// import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use(methodOverride("_method"));
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

app.get("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/users", userRoutes);
app.use("/csv", csvRoutes);
app.use("/admin", adminRouter);

// const transporter=nodemailer.createTransport({
//   host:"smtp.gmail.com",
//   port: 465,
//   secure:true,
//   auth:{
//     user:'uxshowgo@gmail.com',
//     pass:'yulo zzvw wfpf lkfp'
//   },
//   });

//   transporter.sendMail({
//     to:'geo.ayalamung@gmail.com',
//     subject: 'test email',
//     html:'<h1>Hello Geo!<br> This is a test</h1> ',
//   }).then(()=>{
//     console.log('Email has been sent')
//   }).catch(err =>console.log(err)
//   );

const server = app.listen(PORT, () => {});
export default server;

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import expressSession from "express-session";

type Admin = {
  id: number;
  email: string;
  hashedPassword: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

const prisma = new PrismaClient();

const session = expressSession({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const admin = await prisma.admin.findUnique({
        where: {
          email,
        },
      });

      if (!admin) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      const isMatch = await bcrypt.compare(password, admin.hashedPassword);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      return done(null, admin);
    },
  ),
);

passport.serializeUser((admin: Express.User, done) => {
  done(null, admin);
});

passport.deserializeUser(async (user: Admin, done) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!admin) {
    return done(null, false);
  }

  done(null, admin);
});

export { passport, session };

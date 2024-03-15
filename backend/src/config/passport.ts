import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import expressSession from "express-session";

type UserInput = {
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
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser(async (userInput: UserInput, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userInput.id,
    },
  });

  if (!user) {
    return done(null, false);
  }

  done(null, user);
});

export { passport, session };

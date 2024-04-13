import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import expressSession from "express-session";

export type UserInput = {
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "dummy",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: VerifyCallback
    ) => {
      const email = profile.emails ? profile.emails[0].value : "";
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            username: profile.displayName || "unknown",
            email,
            hashedPassword: "",
            provider: "GOOGLE",
            providerId: profile.id,
          },
        });

        return cb(null, newUser);
      } else {
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            email,
            provider: "GOOGLE",
            providerId: profile.id,
          },
        });
        return cb(null, updatedUser);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "dummy",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "dummy",
      callbackURL: "http://localhost:4000/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: VerifyCallback
    ) => {
      const email = profile.emails ? profile.emails[0].value : "";
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            username: profile.displayName || "unknown",
            email,
            hashedPassword: "",
            provider: "GITHUB",
            providerId: profile.id,
          },
        });

        return cb(null, newUser);
      } else {
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            email,
            provider: "GITHUB",
            providerId: profile.id,
          },
        });
        return cb(null, updatedUser);
      }
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

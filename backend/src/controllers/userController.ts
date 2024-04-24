import bcrypt from "bcrypt";
import express, { NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { UserInput } from "@/config/passport";

type User = {
  id: number;
  email: string;
  username: string;
  firstLoginAt: Date;
  hashedPassword: string;
};

const prisma = new PrismaClient();

const signup = async (req: express.Request, res: express.Response) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(409).json({ error: "This email has been used." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user
    .create({
      data: {
        email,
        username,
        hashedPassword: hashedPassword,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(201).json({ message: "Admin created" });
};

const login = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  passport.authenticate("local", async (err: Error, user: User) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    if (!user.firstLoginAt) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstLoginAt: new Date(),
        },
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Authentication successful" });
    });
  })(req, res, next);
};

const logout = (req: express.Request, res: express.Response) => {
  req.logout((err: Error) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
  });
  return res
    .status(200)
    .clearCookie("connect.sid")
    .json({ message: "Logged out" });
};

const getMyUser = (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(404).json({ message: "You are logged out" });
  }
};

const updatePassword = async (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = req.user as UserInput;
    const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword,
      },
    });

    return res.status(200).json(req.user);
  } else {
    return res.status(404).json({ message: "You are logged out" });
  }
};

export { login, logout, signup, getMyUser, updatePassword };

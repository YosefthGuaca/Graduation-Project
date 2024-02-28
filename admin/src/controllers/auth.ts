import bcrypt from "bcrypt";
import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import passport from "passport";

const signup = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  console.log(email, password);

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    return res.status(409).json({ error: "This email has been used." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin
    .create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(201).redirect("/login");
};

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: false,
});

const logout = (req: express.Request, res: express.Response) => {
  req.logout((err: Error) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
  });
  return res.status(200).clearCookie("connect.sid").redirect("/");
};

export { login, logout, signup };

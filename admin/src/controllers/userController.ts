import express from "express";
import { PrismaClient } from "@prisma/client";
import inviteTemplate from "../mails/inviteTemplate";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const getUsers = async (req: express.Request, res: express.Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const users = await prisma.user.findMany().catch((error: Error) => {
    return res.status(500).json(error);
  });

  return res.status(200).json(users);
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        firstLoginInAt: true,
      },
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (user.firstLoginInAt) {
      return res
        .status(202)
        .send("User has already logged in and cannot be deleted");
    }
    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
    res.status(200).send({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

const updateUser = async (req: express.Request, res: express.Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const {
    username,
    email,
    class: userClass,
    premiumStart,
    premiumEnd,
  } = req.body;

  await prisma.user
    .update({
      where: {
        email,
      },
      data: {
        username,
        email,
        class: userClass,
        premiumStart: premiumStart ? new Date(premiumStart) : null,
        premiumEnd: premiumEnd ? new Date(premiumEnd) : null,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json({ error: error.message });
    });

  res.status(200).json();
};

const emailUser = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user || !user.temporaryPassword) {
    return res.status(404).json({ error: "User not found." });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  transporter
    .sendMail({
      to: user.email,
      subject: "UxShowGo Invitation",
      html: inviteTemplate(
        user.email,
        user.temporaryPassword,
        "http://localhost:3000/login"
      ),
    })
    .then(async () => {
      await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          emailSentAt: new Date(),
        },
      });
      res.redirect("/");
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "An error occurred while sending the invitation." });
    });
};

export default { getUsers, deleteUser, updateUser, emailUser };

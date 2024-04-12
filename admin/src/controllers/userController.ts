import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export default { deleteUser, updateUser };

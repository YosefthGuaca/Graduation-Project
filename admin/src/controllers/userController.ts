
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  try {
    // Delete the user from the database
    await prisma.user.delete({
      where: {
        id: parseInt(userId)
      }
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occurred while deleting the user." });
  }
};

export default { deleteUser };

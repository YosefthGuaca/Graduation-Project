
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

const updateUser = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;
  const { username, email, class: userClass, premiumStart, premiumEnd } = req.body;

  try {
    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId)
      },
      data: {
        username,
        email,
        class: userClass,
        premiumStart: premiumStart ? new Date(premiumStart) : null,
        premiumEnd: premiumEnd ? new Date(premiumEnd) : null
      }
    });

    res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occurred while updating the user." });
  }
};

export default { deleteUser, updateUser };
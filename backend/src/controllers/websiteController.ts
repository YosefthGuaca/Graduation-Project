import express from "express";
import prisma from "../client";
import { User } from "@prisma/client";

const getWebsites = async (req: express.Request, res: express.Response) => {
  const user = req.user as User;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const websites = await prisma.website
    .findMany({
      where: {
        userId: user.id,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(200).json(websites || []);
};

export { getWebsites };

import express from "express";
import prisma from "../client";
import { UserInput } from "@/config/passport";

const getWebsites = async (req: express.Request, res: express.Response) => {
  const user = req.user as UserInput;
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

const createWebsite = async (req: express.Request, res: express.Response) => {
  const user = req.user as UserInput;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, slug } = req.body;

  const website = await prisma.website
    .create({
      data: {
        title,
        slug,
        userId: user.id,
        pages: {
          create: [
            {
              status: "Draft",
              name: "Top",
              slug: "index",
            },
          ],
        },
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(200).json(website);
};

export { getWebsites, createWebsite };

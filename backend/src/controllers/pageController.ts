import express from "express";
import prisma from "../client";
import { User } from "@prisma/client";

const getPage = async (req: express.Request, res: express.Response) => {
  const user = req.user as User;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { websiteSlug, pageSlug } = req.params;
  const page = await prisma.page
    .findFirst({
      where: {
        slug: pageSlug,
        version: {
          status: "Draft",
          website: {
            slug: websiteSlug,
            userId: user.id,
          },
        },
      },
      select: {
        content: true,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(200).json(page);
};

const createPage = async (req: express.Request, res: express.Response) => {
  const page = await prisma.page
    .create({
      data: {
        slug: "slug",
        content: { page: "content" },
        name: "name",
        versionId: 1,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(201).json(page || []);
};

const updatePage = async (req: express.Request, res: express.Response) => {
  const user = req.user as User;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { websiteSlug, pageSlug } = req.params;
  const content = req.body;
  const page = await prisma.page
    .updateMany({
      where: {
        slug: pageSlug,
        version: {
          status: "Draft",
          website: {
            slug: websiteSlug,
            userId: user.id,
          },
        },
      },
      data: {
        content,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });
  if (!page) {
    return res.status(404).json({ message: "Page not found" });
  }

  return res.status(200).json(page);
};

export { getPage, createPage, updatePage };

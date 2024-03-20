import express from "express";
import prisma from "../client";

const getPage = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const projects = await prisma.page
    .findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        content: true,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(200).json(projects || []);
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
  const content = req.body;
  const page = await prisma.page
    .update({
      where: {
        id: 1,
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

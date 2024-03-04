import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

  return res.status(200).json(projects);
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

  return res.status(201).json(page);
};

const updatePage = async (req: express.Request, res: express.Response) => {
  const content = req.body;
  console.log(content);
  const page = await prisma.page
    .update({
      where: {
        id: 1,
      },
      data: {
        slug: "slug",
        content,
        name: "name",
        versionId: 1,
      },
    })
    .catch((error: Error) => {
      return res.status(500).json(error);
    });

  return res.status(200).json(page);
};

export { getPage, createPage, updatePage };

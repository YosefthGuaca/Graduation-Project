import express from "express";
import fs from "fs";
import path from "path";
import { UserInput } from "@/config/passport";
import prisma from "../client";

const getPublic = async (req: express.Request, res: express.Response) => {
  const { websiteSlug, pageSlug } = req.params;
  if (!websiteSlug) {
    return res.status(404).send("Not found");
  }
  const filename = pageSlug ? `${pageSlug}.html` : "index.html";

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "tmp",
    "public",
    websiteSlug,
    filename
  );

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Not found");
    }
    res.type("html");
    return res.sendFile(filePath);
  });
};

const createPublic = async (req: express.Request, res: express.Response) => {
  const user = req.user as UserInput;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { websiteSlug, pageSlug } = req.params;

  const page = await prisma.page.findFirst({
    where: {
      slug: pageSlug,
      status: "Draft",
      website: {
        slug: websiteSlug,
        userId: user.id,
      },
    },
  });

  const { html, css } = req.body;

  if (!page || !websiteSlug || !html) {
    return res.status(400).send("Bad request");
  }

  await prisma.page.updateMany({
    where: {
      slug: pageSlug,
      website: {
        slug: websiteSlug,
        userId: user.id,
      },
    },
    data: {
      status: "Archived",
    },
  });

  await prisma.page.update({
    where: {
      id: page.id,
    },
    data: {
      status: "Published",
      publishedAt: new Date(),
    },
  });

  await prisma.page.create({
    data: {
      slug: pageSlug,
      status: "Draft",
      content: page.content || {},
      name: page.name,
      websiteId: page.websiteId,
    },
  });

  const filename = `${pageSlug}.html`;
  const dirPath = path.join(
    __dirname,
    "..",
    "..",
    "tmp",
    "public",
    websiteSlug
  );
  const filePath = path.join(dirPath, filename);

  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to create directory");
    }

    fs.writeFile(filePath, `${html}<style>${css}</style>`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to save the file");
      }
      return res.status(200).send("File saved successfully");
    });
  });
};

export { getPublic, createPublic };

import express from "express";
import prisma from "../client";

const getWebsites = async (req: express.Request, res: express.Response) => {
  const websites = await prisma.website.findMany({}).catch((error: Error) => {
    return res.status(500).json(error);
  });

  return res.status(200).json(websites || []);
};

export { getWebsites };

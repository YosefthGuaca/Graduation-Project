import express from "express";
import fs from "fs";
import path from "path";

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
    filename,
  );

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Not found");
    }
    res.type("html");
    return res.sendFile(filePath);
  });
};

export { getPublic };

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
  const { websiteSlug, pageSlug } = req.params;
  const { html, css } = req.body;

  if (!websiteSlug || !html) {
    return res.status(400).send("Bad request");
  }

  const filename = pageSlug ? `${pageSlug}.html` : "index.html";
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

import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { parse } from "csv-parse";
import fs from "fs";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const upload = multer({ dest: "upload" });

interface CsvUserRecord {
  username: string;
  email: string;
  class: string;
  premiumStart: string;
  premiumEnd: string;
}

const uploadUsersFromCsv = [
  upload.single("csvfile"),
  async (req: express.Request, res: express.Response) => {
    if (!req.file) {
      return res.status(400).send("No file was uploaded.");
    }

    const filePath = req.file.path;

    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Error reading uploaded file");
      }

      parse(
        fileData,
        { columns: true, trim: true },
        async (err, records: CsvUserRecord[]) => {
          if (err) {
            console.error("Error parsing CSV:", err);
            return res.status(500).send("Error parsing CSV file");
          }

          try {
            for (const record of records) {
              const hashedPassword = await bcrypt.hash("defaultPassword", 10);

              // Check if the user with the given email already exists
              const existingUser = await prisma.user.findUnique({
                where: { email: record.email },
              });

              if (!existingUser) {
                // If the user doesn't exist, create a new one
                await prisma.user.create({
                  data: {
                    email: record.email,
                    username: record.username,
                    class: record.class,
                    hashedPassword: hashedPassword,
                    premiumStart: new Date(record.premiumStart),
                    premiumEnd: new Date(record.premiumEnd),
                  },
                });
              } else {
                console.warn(
                  `User with email ${record.email} already exists. Skipping.`,
                );
              }
            }
            res.send("Users have been successfully uploaded and saved.");
          } catch (error) {
            console.error("Error saving to database:", error);
            res.status(500).send("Error saving records to the database");
          } finally {
            fs.unlinkSync(filePath);
          }
        },
      );
    });
  },
];

export { uploadUsersFromCsv };

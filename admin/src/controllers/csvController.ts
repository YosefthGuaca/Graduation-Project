import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import multer from "multer";
import { parse } from "csv-parse";
import fs from "fs";

const prisma = new PrismaClient();

const upload = multer({ dest: "upload" });

// Interface for CSV user records
interface CsvUserRecord {
  username: string;
  email: string;
  class: string;
  premiumStart: string;
  premiumEnd: string;
}

const app = express();
app.use(express.json());

// Controller to add a user individually
app.post("/admin/adduser", async (req, res) => {
  const { username, email, class: userClass, premiumStart, premiumEnd } = req.body;

  // Validate user data
  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required fields." });
  }

  try {
    // Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.warn(`User with email ${email} already exists. Skipping.`);
      return res.status(409).json({ error: "User already exists." });
    }

    // Create a new user in the database using Prisma
    const hashedPassword = await bcrypt.hash("defaultPassword", 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        class: userClass,
        hashedPassword,
        premiumStart: premiumStart ? new Date(premiumStart) : undefined,
        premiumEnd: premiumEnd ? new Date(premiumEnd) : undefined,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
});

// Controller to upload users from CSV (existing code)
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

// Export both controllers
export { uploadUsersFromCsv };

import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { parse } from "csv-parse";
import fs from "fs";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const upload = multer({ dest: "upload" });

interface CsvUserRecord {
  name: string;
  email: string;
  // class: string;
  premium_start: string;
  premium_end: string;
}

// const uploadUsersFromCsv = [
//   upload.single("csv"),
//   async (req: express.Request, res: express.Response) => {
//     if (!req.file) {
//       return res.status(400).send("No file was uploaded.");
//     }

//     const filePath = req.file.path;

//     fs.readFile(filePath, (err, fileData) => {
//       if (err) {
//         console.error("Error reading file:", err);
//         return res.status(500).send("Error reading uploaded file");
//       }

//       parse(
//         fileData,
//         { columns: true, trim: true },
//         async (err, records: CsvUserRecord[]) => {
//           if (err) {
//             console.error("Error parsing CSV:", err);
//             return res.status(500).send("Error parsing CSV file");
//           }

//           try {
//             for (const record of records) {
//               const hashedPassword = await bcrypt.hash("defaultPassword", 10);
//               await prisma.user.create({
//                 data: {
//                   email: record.email,
//                   username: record.name,
//                   hashedPassword,
//                   // class: record.class,
//                   premiumStart: new Date(record.premium_start),
//                   premiumEnd: new Date(record.premium_end),
//                 },
//               });
//             }

//             res.send("Users have been successfully uploaded and saved.");
//           } catch (error) {
//             console.error("Error saving to database:", error);
//             res.status(500).send("Error saving records to the database");
//           } finally {
//             fs.unlinkSync(filePath);
//           }
//         }
//       );
//     });
//   },
// ];

const uploadUsersFromCsv = async (
  req: express.Request,
  res: express.Response
) => {
  return res.status(200).json({ message: "Hello from csv controller" });
};

export { uploadUsersFromCsv };

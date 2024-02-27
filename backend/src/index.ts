import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 4000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default server;

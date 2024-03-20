import pool from "../config/pool";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM websites");
    const websites = result.rows;
    client.release();
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

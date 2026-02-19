import { Request, Response } from "express";
import { query } from "../db";

export const getDoctors = async (_req: Request, res: Response) => {
  try {
    const { rows } = await query(`
      SELECT id, name, specialization, chats
      FROM doctors
      ORDER BY COALESCE(updated_at, created_at) DESC;
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

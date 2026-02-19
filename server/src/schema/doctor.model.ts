import { query } from "../db";

export const createDoctorTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS doctors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      specialization VARCHAR(255) NOT NULL,
      chats JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ
    );
      `;
  try {
    await query(createTableQuery);
    console.info("Doctors table ready!");
  } catch (error: any) {
    console.error("Error while creating the doctors table", error.message);
    throw error;
  }
};

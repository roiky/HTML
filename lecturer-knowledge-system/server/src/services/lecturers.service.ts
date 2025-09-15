import { pool } from "../db/pool.js";
import { Lecturer } from "../types/lecturer.js";

export async function getAllLecturers(): Promise<Lecturer[]> {
  const [rows] = await pool.query<Lecturer[]>("SELECT * FROM lecturer ORDER BY id ASC");
  return rows;
}

export async function updateKnowledgeById(id: number, column: string, level: string) {
  const sql = `UPDATE lecturer SET ${column} = ? WHERE id = ?`;
  const [res] = await pool.execute(sql, [level, id]);
  return res;
}

export async function createLecturer(payload: {
  first_name:string; last_name:string; age:number; course_count:number; email:string;
}) {
  const [dup] = await pool.execute("SELECT id FROM lecturer WHERE email = ?", [payload.email]);
  if ((dup as any[]).length) throw new Error("EMAIL_EXISTS");

  const sql = `
    INSERT INTO lecturer (first_name,last_name,age,course_count,email)
    VALUES (?,?,?,?,?)
  `;
  const [res] = await pool.execute(sql, [
    payload.first_name, payload.last_name, payload.age, payload.course_count, payload.email
  ]);
  return res;
}

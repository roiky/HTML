import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export async function deleteExpenseById(id: number): Promise<void> {
    try {
        const conn = await mysql2.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
        });

        await conn.execute(`DELETE FROM northwind.expenses WHERE id = ?`, [id]);
        await conn.end();
    } catch (error) {
        console.error(`error for ID ${id}:`, error);
    }
}

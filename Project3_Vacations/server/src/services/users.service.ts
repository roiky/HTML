import bcrypt from "bcrypt";
import getConnection from "../db";

export type UserRow = {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: "user" | "admin";
    password_hash?: string;
};

export async function isEmailExists(email: string): Promise<boolean> {
    const conn = await getConnection();
    const [rows]: any = await conn.execute("SELECT 1 FROM users WHERE email = ? LIMIT 1", [email]);
    return rows.length > 0;
}

export async function createUser({
    first_name,
    last_name,
    email,
    password,
    role = "user",
}: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role?: "user" | "admin";
}): Promise<number> {
    const conn = await getConnection();
    const hashed = await bcrypt.hash(password, 10);
    const [res]: any = await conn.execute(
        "INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)",
        [first_name, last_name, email, hashed, role]
    );
    return res.insertId as number;
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
    const conn = await getConnection();
    const [rows]: any = await conn.execute(
        "SELECT user_id, first_name, last_name, email, role, password_hash FROM vacations_app.users WHERE email = ? LIMIT 1",
        [email]
    );
    if (rows.length === 0) return null;
    return rows[0] as UserRow;
}

export async function findUserById(id: number): Promise<UserRow | null> {
    const conn = await getConnection();
    const [rows]: any = await conn.execute(
        "SELECT user_id, first_name, last_name, email, role FROM vacations_app.users WHERE user_id = ? LIMIT 1",
        [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as UserRow;
}

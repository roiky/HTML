import getConnection from "../../db";
import { User } from ".";

export async function login(user: User): Promise<Partial<User> | undefined> {
    const conn = await getConnection();

    const email = (user.userName || "").toLowerCase().trim();
    const params = [email, user.password];

    const [rows]: any = await conn.execute(getLoginQuery(), params);

    if (Array.isArray(rows) && rows.length > 0) {
        const foundUser = rows[0];
        console.log("✅ Found user:", foundUser);
        return foundUser;
    } else {
        console.log("❌ No user found");
    }

    return undefined;
}

const getLoginQuery = () => `
  SELECT *
  FROM northwind.users
  WHERE LOWER(email) = ? AND password = ?
  LIMIT 1
`;

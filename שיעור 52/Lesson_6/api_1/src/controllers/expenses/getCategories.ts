import getConnection from "../../db";

export default async function getCategories() {
    const conn = await getConnection();
    const getAllCategories = `
        SELECT DISTINCT (category)
        FROM northwind.expenses;`;

    const [rows] = await conn.execute(getAllCategories, []);
    return rows;
}

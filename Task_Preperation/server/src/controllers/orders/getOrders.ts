import getConnection from "../../db";

export default async function getOrders() {
    const conn = await getConnection();
    const getOrdersQuery = `SELECT 
    o.id,
    CONCAT(emp.first_name, ' ', emp.last_name) AS 'employeeName',
    CONCAT(c.first_name, ' ', c.last_name) AS 'customerName',
    o.shipping_fee,
    o.ship_city
FROM
    northwind.orders AS o
        INNER JOIN
    employees AS emp ON emp.id = o.employee_id
        INNER JOIN
    customers AS c ON c.id = o.customer_id`;

    const [rows] = await conn.execute(getOrdersQuery, []);
    return rows;
}

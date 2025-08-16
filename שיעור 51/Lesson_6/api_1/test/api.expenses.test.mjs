import { expect } from "chai";
import axios from "axios";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://localhost:3000/api/expenses";
let testUserID;
let dbConnection;

describe("Test Login API POST /Login", () => {
    // BEFORE – פותחים את החיבור
    before(async () => {
        dbConnection = await mysql2.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
            multipleStatements: true,
        });
    });

    after(async () => {
        if (dbConnection) {
            await dbConnection.end();
        }
    });

    it("GET /expenses/expenses - expenses between dates", async () => {
        const res = await axios.get(`${BASE_URL}/expenses`, {
            params: {
                from: "2025-08-10",
                to: "2026-08-10",
            },
        });
        expect(res.status).to.equal(200);
        expect(res.data.data).to.be.an("array");
        expect(res.data.data.length).to.be.greaterThan(0);
    });

    it("POST /expenses/expenses - insert new expenes", async () => {
        const randomAmount = parseFloat((Math.random() * (999 - 10) + 10).toFixed(2));
        const newExpense = {
            amount: randomAmount,
            category: "TestCategory",
            date: "2025-08-15",
            description: "Test expense entry",
        };

        const res = await axios.post(`${BASE_URL}/expenses`, newExpense);

        expect(res.status).to.equal(201);
        expect(res.data).to.have.property("id");
        const insertedId = res.data.id;
        console.log(`[Expenses] Inserted new row, ID: ${insertedId}, amount:${randomAmount}`);
        const [rows] = await dbConnection.execute(`SELECT * FROM northwind.expenses WHERE id = ?`, [insertedId]);

        expect(rows).to.have.lengthOf(1);
    });
});

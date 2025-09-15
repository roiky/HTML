import { expect } from "chai";
import axios from "axios";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://localhost:3000";

const axiosInstanceApi = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

let db;

describe("[/GET] Lecturers API", () => {
    before(async () => {
        db = await mysql2.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || process.env.PASSWORD || "root",
            database: process.env.DB_NAME || process.env.DATABASE || "lecturer_management",
            port: Number(process.env.DB_PORT) || 3306,
            multipleStatements: true,
        });
    });

    after(async () => {
        if (db) await db.end();
    });

    it("GET /lecturers - should return a list of lecturers", async () => {
        const res = await axiosInstanceApi.get("/lecturers");
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property("data").that.is.an("array");

        if (res.data.data.length) {
            const sample = res.data.data[0];
            expect(sample).to.include.keys("id", "first_name", "last_name", "email");
        }
    });
});

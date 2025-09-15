import { expect } from "chai";
import axios from "axios";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://localhost:3000/lecturers";

const axiosInstanceApi = axios.create({
    baseURL: BASE_URL,
});

let dbConnection;

describe("[/POST] Lecturers API", () => {
    before(async () => {
        dbConnection = await mysql2.createConnection({
            host: "localhost",
            user: "root",
            password: process.env.PASSWORD,
            database: "lecturer_management",
            port: 3306,
        });
    });

    after(async () => {
        if (dbConnection) {
            await dbConnection.end();
        }
    });

    it("POST /lecturers - should create new lecturer successfully", async () => {
        const uniqueEmail = `test${Date.now()}@example.com`;
        const newLecturer = {
            first_name: "Test",
            last_name: "User",
            age: 25,
            course_count: 2,
            email: uniqueEmail,
        };

        const res = await axiosInstanceApi.post("/addLecturer", newLecturer);

        expect(res.status).to.equal(201);
        expect(res.data).to.have.property("message", "Lecturer created");
        expect(res.data).to.have.property("id").that.is.a("number");

        // Verify via DB
        const [rows] = await dbConnection.execute(`SELECT * FROM lecturer WHERE email = ?`, [uniqueEmail]);
        expect(rows).to.have.lengthOf(1);
        expect(rows[0].first_name).to.equal("Test");

        // Cleanup
        await dbConnection.execute(`DELETE FROM lecturer WHERE email = ?`, [uniqueEmail]);
    });

    it("POST /lecturers - should reject duplicate email", async () => {
        const duplicateEmail = `dup${Date.now()}@example.com`;

        // Insert once
        await dbConnection.execute(
            `INSERT INTO lecturer (first_name, last_name, age, course_count, email, created_at,
       level_n8n, level_fullstack, level_AI, level_MySQL)
       VALUES (?, ?, ?, ?, ?, NOW(), 1, 1, 1, 1)`,
            ["Dup", "User", 30, 1, duplicateEmail]
        );

        const res = await axiosInstanceApi
            .post("/addLecturer", {
                first_name: "Dup",
                last_name: "User",
                age: 30,
                course_count: 1,
                email: duplicateEmail,
            })
            .catch((err) => err.response);

        expect(res.status).to.equal(409);
        expect(res.data.message).to.include("Email already exists");

        // Cleanup
        await dbConnection.execute(`DELETE FROM lecturer WHERE email = ?`, [duplicateEmail]);
    });

    it("POST /lecturers - should return 400 for invalid email", async () => {
        const res = await axiosInstanceApi
            .post("/addLecturer", {
                first_name: "Bad",
                last_name: "Email",
                age: 22,
                course_count: 1,
                email: "not-an-email",
            })
            .catch((err) => err.response);

        expect(res.status).to.equal(400);
        //expect(res.data.message).to.include("Invalid email format");
    });
});

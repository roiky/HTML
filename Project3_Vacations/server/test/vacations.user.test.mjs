import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import mysql2 from "mysql2/promise";
import { randomEmail, registerViaApi, loginViaApi, deleteUserByEmail, axiosWithToken, BASE_URL } from "./helpers.test.mjs";

describe("Vacation - user functions", function () {
    this.timeout(7000);

    const email = randomEmail();
    const password = "pass1234";
    let token;
    let userId;
    let conn;

    before(async () => {
        const res = await registerViaApi({ first_name: "User", last_name: "Function_Test", email, password });
        userId = res.data.id;
        const loginRes = await loginViaApi({ email, password });
        token = loginRes.data.token;
        conn = await mysql2.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.PASSWORD || "root",
            database: process.env.DATABASE || "vacations_app",
            port: Number(process.env.DB_PORT) || 3306,
        });
    });

    after(async () => {
        //await deleteUserByEmail(email);
        if (conn) await conn.end();
    });

    it("[All-vacations]-[GET] /vac/all - get all vacation (or first 10...)", async () => {
        const res = await axiosWithToken(token).get("/vac/all");
        expect(res.status).to.equal(200);
        expect(res).to.have.property("data");
        expect(res.data).to.be.an("object");
    });

    it("[Follow Vacation]-[POST] /vac/{id}/follow - follow a vacation", async () => {
        const followRes = await axiosWithToken(token).post("/vac/1/follow"); //i assume that the DB have at least 1 vacation in it
        expect(followRes.status).to.equal(204);
        //console.log(`[UserID ${userId}] followed vacation!`);
    });

    it("[Unfollow Vacation]-[DELETE] /vac/{id}/follow - unfollow a vacation", async () => {
        const followRes = await axiosWithToken(token).delete("/vac/1/follow"); //i assume that the DB have at least 1 vacation in it
        expect(followRes.status).to.equal(204);
        //console.log(`[${userId}] unfollowed vacation!`);
    });
});

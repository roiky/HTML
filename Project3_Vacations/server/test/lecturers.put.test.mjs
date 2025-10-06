// import { expect } from "chai";
// import axios from "axios";
// import mysql2 from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

// const BASE_URL = "http://localhost:3000/lecturers";

// const axiosInstanceApi = axios.create({
//     baseURL: BASE_URL,
//     headers: { "Content-Type": "application/json" },
// });

// let db;

// const ALLOWED_LEVELS = ["No Knowledge", "Low", "Medium", "Expert"];
// const TEST_DOMAIN = "MySQL";
// const DOMAIN_FIELD_IN_SELECT = "mysql_level";

// function pickDifferentLevel(current) {
//     const options = ALLOWED_LEVELS.filter((l) => l !== current);
//     return options.length ? options[0] : "Medium";
// }

// describe("[/PUT] Lecturers API", () => {
//     before(async () => {
//         db = await mysql2.createConnection({
//             host: process.env.DB_HOST || "localhost",
//             user: process.env.DB_USER || "root",
//             password: process.env.DB_PASSWORD || process.env.PASSWORD || "root",
//             database: process.env.DB_NAME || process.env.DATABASE || "lecturer_management",
//             port: Number(process.env.DB_PORT) || 3306,
//             multipleStatements: true,
//         });
//     });

//     after(async () => {
//         if (db) await db.end();
//     });

//     it("PUT /lecturers/:id/knowledge - should update MySQL knowledge level and revert", async () => {
//         // 1) בוחרים מרצה קיים
//         const listRes = await axiosInstanceApi.get("/");
//         expect(listRes.status).to.equal(200);
//         const arr = listRes.data.data;
//         expect(arr).to.be.an("array").that.is.not.empty;

//         const lecturer = arr[0]; // אפשר גם לבחור ספציפי לפי מייל וכו'
//         const id = lecturer.id;
//         const currentLevel = lecturer[DOMAIN_FIELD_IN_SELECT] || "No Knowledge";
//         const newLevel = pickDifferentLevel(currentLevel);

//         // 2) מבצעים עדכון
//         const putRes = await axiosInstanceApi.put(`/${id}/knowledge`, {
//             domain: TEST_DOMAIN,
//             level: newLevel,
//         });
//         expect([200, 204]).to.include(putRes.status);

//         // 3) מאמתים דרך GET שהערך התעדכן
//         const verifyRes = await axiosInstanceApi.get("/");
//         expect(verifyRes.status).to.equal(200);
//         const updated = verifyRes.data.data.find((x) => x.id === id);
//         expect(updated).to.exist;
//         expect(updated[DOMAIN_FIELD_IN_SELECT]).to.equal(newLevel);

//         // 4) מחזירים את הערך לקדמותו כדי לשמור על DB נקי
//         const revertRes = await axiosInstanceApi.put(`/${id}/knowledge`, {
//             domain: TEST_DOMAIN,
//             level: currentLevel,
//         });
//         expect([200, 204]).to.include(revertRes.status);

//         const verifyRevert = await axiosInstanceApi.get("/");
//         const reverted = verifyRevert.data.data.find((x) => x.id === id);
//         expect(reverted[DOMAIN_FIELD_IN_SELECT]).to.equal(currentLevel);
//     });

//     it("PUT /lecturers/:id/knowledge - should return 400 for invalid domain", async () => {
//         try {
//             await axiosInstanceApi.put(`/1/knowledge`, {
//                 domain: "INVALID_DOMAIN",
//                 level: "Low",
//             });
//             throw new Error("Expected 400 but request succeeded");
//         } catch (err) {
//             const res = err.response;
//             expect(res).to.exist;
//             expect(res.status).to.equal(400);
//             expect(res.data).to.have.property("message");
//         }
//     });

//     it("PUT /lecturers/:id/knowledge - should return 400 for invalid level", async () => {
//         try {
//             await axiosInstanceApi.put(`/1/knowledge`, {
//                 domain: TEST_DOMAIN,
//                 level: "NotALevel",
//             });
//             throw new Error("Expected 400 but request succeeded");
//         } catch (err) {
//             const res = err.response;
//             expect(res).to.exist;
//             expect(res.status).to.equal(400);
//             expect(res.data).to.have.property("message");
//         }
//     });

//     it("PUT /lecturers/:id/knowledge - should return 404 for non-existent lecturer", async () => {
//         try {
//             await axiosInstanceApi.put(`/999999/knowledge`, {
//                 domain: TEST_DOMAIN,
//                 level: "Low",
//             });
//             throw new Error("Expected 404 but request succeeded");
//         } catch (err) {
//             const res = err.response;
//             expect(res).to.exist;
//             expect(res.status).to.equal(404);
//             expect(res.data).to.have.property("message");
//         }
//     });
// });

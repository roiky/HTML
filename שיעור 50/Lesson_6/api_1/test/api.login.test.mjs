import { expect } from "chai";
import axios from "axios";

const URL = "http://localhost:3000/auth/";

describe("Test Login API POST /Login", () => {
    it("login success", async () => {
        const uniqueEmail = `roei${Date.now()}@gmail.com`;

        const registerResult = await axios.post(URL + "register", {
            userName: uniqueEmail,
            age: 20,
            password: "1234ww",
            phone: "0501234567",
        });

        expect(registerResult.status).equal(200);
        expect(registerResult.data.message).equal("User Registered in successfully");

        const loginResult = await axios.post(URL + "login", {
            userName: uniqueEmail,
            password: "1234ww",
        });

        expect(loginResult.status).equal(200);
        expect(loginResult.data.message).equal("User logged in successfully");
    });

    it("login input validation", async () => {
        try {
            await axios.post(URL + "login", { userName: "admin", password: "admin" });
            throw new Error("Expected validation error");
        } catch (error) {
            expect(error.response.status).equal(400);
        }

        try {
            await axios.post(URL + "login", { userName: "admin@gmail.com", password: "ad" });
            throw new Error("Expected validation error");
        } catch (error) {
            expect(error.response.status).equal(400);
        }
    });

    it("login failed", async () => {
        try {
            await axios.post(URL + "login", { userName: "admin@gmail.com", password: "admin123" });
            throw new Error("Expected parameters error");
        } catch (error) {
            expect(error.response.status).equal(401);
            expect(error.response.data).equal("Unauthorized___");
        }
    });

    it("login - bad request (missing username/password)", async () => {
        try {
            await axios.post(URL + "login", { userName: "admin" });
            throw new Error("Expected param error");
        } catch (error) {
            expect(error.response.status).equal(400);
            expect(error.response.data).equal("Bad Request");
        }

        try {
            await axios.post(URL + "login", { password: "ad" });
            throw new Error("Expected param error");
        } catch (error) {
            expect(error.response.status).equal(400);
            expect(error.response.data).equal("Bad Request");
        }
    });
});

const chai = require("chai");
const { expect } = chai;
const axios = require("axios");

const URL = "http://localhost:3000/auth/";

describe("Test Login API POST /Login", () => {
    it("login - success", async () => {
        const result = await axios.post(URL + "login", {
            userName: "admin@gmail.com",
            password: "admin",
        });
        const data = result.data;
        expect(result.status).equal(200);
        expect(data.message).equal("User logged in successfully");
    });
    it("login input validation", async () => {
        try {
            await axios.post(URL + "login", {
                userName: "admin", // invalid email
                password: "admin",
            });
            throw new Error("Expected validation error");
        } catch (error) {
            expect(error.response.status).equal(400);
        }

        try {
            await axios.post(URL + "login", {
                userName: "admin@gmail.com",
                password: "ad", // too short
            });
            throw new Error("Expected validation error");
        } catch (error) {
            expect(error.response.status).equal(400);
        }
    });

    it("login failed", async () => {
        try {
            await axios.post(URL + "login", {
                userName: "admin@gmail.com",
                password: "admin123",
            });
            throw new Error("Expected parameters error");
        } catch (error) {
            expect(error.response.status).equal(401);
            expect(error.response.data).equal("Unauthorized___");
        }
    });
    it("login - bad request (missing username/password)", async () => {
        try {
            await axios.post(URL + "login", {
                userName: "admin", // no password
            });
            throw new Error("Expected param error");
        } catch (error) {
            expect(error.response.status).equal(400);
            expect(error.response.data).equal("Bad Request");
        }

        try {
            await axios.post(URL + "login", {
                password: "ad", // no email
            });
            throw new Error("Expected param error");
        } catch (error) {
            expect(error.response.status).equal(400);
            expect(error.response.data).equal("Bad Request");
        }
    });
});

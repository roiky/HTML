const chai = require("chai");
const { expect } = chai;
const axios = require("axios");

const URL = "http://localhost:3000/auth/";
const PROTECTED_URL = "http://localhost:3000/api/";

describe("protected page API GET /expenses", () => {
    it("get protected page", async () => {
        try {
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

            const userToken = loginResult.data.token;
            //console.log(`USER TOKEN: ${userToken}`);

            const protectedResult = await axios.get(PROTECTED_URL + "expenses", {
                headers: {
                    Authorization: `${userToken}`,
                },
            });

            expect(protectedResult.status).equal(200);
            expect(protectedResult.data.message).equal("i am protected!!!");
        } catch (error) {
            console.error("TEST FAILED:", error.message);
        }
    });
});

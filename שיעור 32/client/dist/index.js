"use strict";
const DOM = {
    username: null,
    password: null,
    registerResponse: null,
    LoginUsername: null,
    LoginPassword: null,
    LoginOutput: null,
    loginBTN: null,
    usersOutput: null,
    usersBTN: null,
    authInput: null,
    authBTN: null,
    authOutput: null
};
function init() {
    var _a, _b, _c, _d;
    DOM.username = document.querySelector("#userName");
    DOM.password = document.querySelector("#password");
    DOM.registerResponse = document.querySelector("#registerResponse");
    DOM.LoginUsername = document.querySelector("#LoginUsername");
    DOM.LoginPassword = document.querySelector("#LoginPassword");
    DOM.loginBTN = document.querySelector("#loginBTN");
    DOM.LoginOutput = document.querySelector("#loginOutput");
    DOM.usersOutput = document.querySelector("#usersOutput");
    DOM.usersBTN = document.querySelector("#usersBTN");
    DOM.authInput = document.querySelector("#authInput");
    DOM.authBTN = document.querySelector("#authBTN");
    DOM.authOutput = document.querySelector("#authOutput");
    (_a = document.getElementById("registerAction")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", async () => {
        var _a, _b;
        try {
            const result = await registerApi({ username: (_a = DOM.username) === null || _a === void 0 ? void 0 : _a.value, password: (_b = DOM.password) === null || _b === void 0 ? void 0 : _b.value });
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = result;
            }
        }
        catch (ex) {
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = ex.message;
            }
        }
    });
    (_b = DOM.loginBTN) === null || _b === void 0 ? void 0 : _b.addEventListener("click", async () => {
        var _a, _b;
        try {
            const result = await loginApi({
                username: (_a = DOM.LoginUsername) === null || _a === void 0 ? void 0 : _a.value,
                password: (_b = DOM.LoginPassword) === null || _b === void 0 ? void 0 : _b.value
            });
            if (DOM.LoginOutput) {
                DOM.LoginOutput.innerText = result;
            }
        }
        catch (ex) {
            if (DOM.LoginOutput) {
                DOM.LoginOutput.innerText = ex.message;
            }
        }
    });
    (_c = DOM.usersBTN) === null || _c === void 0 ? void 0 : _c.addEventListener("click", async () => {
        const result = await usersApi();
    });
    (_d = DOM.authBTN) === null || _d === void 0 ? void 0 : _d.addEventListener("click", async () => {
        var _a;
        try {
            if (!((_a = DOM.authInput) === null || _a === void 0 ? void 0 : _a.value)) {
                if (DOM.authOutput)
                    DOM.authOutput.innerText = "Please insert token!";
                return;
            }
            else {
                const token = DOM.authInput.value;
                const result = await checkToken(token);
                if (DOM.authOutput)
                    DOM.authOutput.innerText = result;
            }
        }
        catch (error) {
            if (DOM.authOutput)
                DOM.authOutput.innerText = error.message;
        }
    });
}
async function registerApi(payload) {
    const rawResponse = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const content = await rawResponse.text();
    return content;
}
async function loginApi(payload) {
    const response = await fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const content = await response.text();
    return content;
}
// async function usersApi(){
//     const response = await fetch(`http://localhost:3000/api/users`,{
//         method: 'GET'
//     });
//     const content = await response.json();
//     return JSON.stringify(content)
// }
async function usersApi() {
    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "GET"
        });
        const users = await response.json();
        if (!Array.isArray(users))
            throw new Error("Unexpected data");
        if (DOM.usersOutput) {
            DOM.usersOutput.innerHTML = "<strong>Users List:</strong><br>" +
                users.map(u => `- ${u.username} (password: ${u.password})`).join("<br>");
        }
    }
    catch (ex) {
        if (DOM.usersOutput) {
            DOM.usersOutput.innerText = ex.message || "Error fetching users";
        }
    }
}
async function checkToken(token) {
    const response = await fetch(`http://localhost:3000/api/token?token=${token}`, {
        method: 'GET'
    });
    const content = await response.text();
    return content;
}
init();

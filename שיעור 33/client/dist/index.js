"use strict";
const DOM = {
    userName: null,
    password: null,
    registerResponse: null,
    loginResponse: null
};
function init() {
    DOM.userName = document.querySelector("#userName");
    DOM.password = document.querySelector("#password");
    DOM.registerResponse = document.querySelector("#registerResponse");
    DOM.loginResponse = document.querySelector("#loginResponse");
    document.getElementById("registerAction")?.addEventListener("click", async () => {
        try {
            const result = await registerApi({ userName: DOM.userName?.value, password: DOM.password?.value });
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
    document.getElementById("loginAction")?.addEventListener("click", async () => {
        try {
            const userNameLogin = document.querySelector("#userNameLogin")?.value;
            const passwordLogin = document.querySelector("#passwordLogin")?.value;
            if (userNameLogin && passwordLogin) {
                const result = await loginApi({ userName: userNameLogin, password: passwordLogin });
                if (DOM.loginResponse) {
                    if (result.token) {
                        localStorage.setItem("token", result.token);
                    }
                    DOM.loginResponse.innerText = JSON.stringify(result);
                }
            }
        }
        catch (ex) {
            if (DOM.loginResponse) {
                DOM.loginResponse.innerText = ex.message;
            }
        }
    });
    document.getElementById("getUsersAction")?.addEventListener("click", async () => {
        try {
            const result = await getUsersApi();
            const element = document.querySelector("#getUsersResponse");
            if (element) {
                element.innerHTML = JSON.stringify(result);
            }
        }
        catch (ex) {
            alert("error");
        }
    });
    document.getElementById("getTokensAction")?.addEventListener("click", async () => {
        try {
            const result = await getTokensApi();
            const element = document.querySelector("#getTokensResponse");
            if (element) {
                element.innerHTML = JSON.stringify(result);
            }
        }
        catch (ex) {
            alert("error");
        }
    });
}
async function registerApi(payload) {
    const rawResponse = await fetch('http://localhost:3000/auth/register', {
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
    const rawResponse = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const content = await rawResponse.json();
    return content;
}
async function getUsersApi() {
    const usersResponse = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: new Headers({
            'Authorization': localStorage.getItem("token") || "",
            'Content-Type': 'application/json'
        }),
    });
    const content = await usersResponse.json();
    return content;
}
async function getTokensApi() {
    const tokensResponse = await fetch('http://localhost:3000/api/tokens', {
        method: 'GET',
        headers: new Headers({
            'Authorization': localStorage.getItem("token") || "",
            'Content-Type': 'application/json'
        }),
    });
    const content = await tokensResponse.json();
    return content;
}
init();

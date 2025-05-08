type DOMAttr = {
    username: HTMLInputElement | null,
    password: HTMLInputElement | null,
    registerResponse: HTMLDivElement | null,
    LoginUsername: HTMLInputElement | null,
    LoginPassword: HTMLInputElement | null,
    LoginOutput: HTMLDivElement | null,
    loginBTN: HTMLButtonElement | null,
    usersOutput: HTMLDivElement | null,
    usersBTN: HTMLButtonElement | null,
    authInput: HTMLInputElement | null,
    authBTN: HTMLButtonElement | null,
    authOutput: HTMLDivElement | null
}

const DOM: DOMAttr = {
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

}

function init() {
    DOM.username = document.querySelector<HTMLInputElement>("#userName")
    DOM.password = document.querySelector<HTMLInputElement>("#password")
    DOM.registerResponse = document.querySelector("#registerResponse")

    DOM.LoginUsername = document.querySelector<HTMLInputElement>("#LoginUsername")
    DOM.LoginPassword = document.querySelector<HTMLInputElement>("#LoginPassword")
    DOM.loginBTN = document.querySelector<HTMLButtonElement>("#loginBTN")
    DOM.LoginOutput = document.querySelector("#loginOutput")

    DOM.usersOutput = document.querySelector<HTMLDivElement>("#usersOutput")
    DOM.usersBTN = document.querySelector<HTMLButtonElement>("#usersBTN")

    DOM.authInput = document.querySelector<HTMLInputElement>("#authInput");
    DOM.authBTN = document.querySelector<HTMLButtonElement>("#authBTN");
    DOM.authOutput = document.querySelector<HTMLDivElement>("#authOutput");

    document.getElementById("registerAction")?.addEventListener("click", async () => {
        try {
            const result = await registerApi({ username: DOM.username?.value as string, password: DOM.password?.value as string })
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = result;
            }
        } catch (ex: any) {
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = ex.message;
            }
        }

    })

    DOM.loginBTN?.addEventListener("click", async () => {
        try {
            const result = await loginApi({
                username: DOM.LoginUsername?.value as string,
                password: DOM.LoginPassword?.value as string
            });

            if (DOM.LoginOutput) {
                DOM.LoginOutput.innerText = result;
            }
        } catch (ex: any) {
            if (DOM.LoginOutput) {
                DOM.LoginOutput.innerText = ex.message;
            }
        }
    });

    DOM.usersBTN?.addEventListener("click", async () => {
        const result = await usersApi()

    })

    DOM.authBTN?.addEventListener("click", async () => {
        try {
            if (!DOM.authInput?.value) {
                if (DOM.authOutput) DOM.authOutput.innerText = "Please insert token!";
                return;
            }
            else {
                const token = DOM.authInput.value as string;
                const result = await checkToken(token);
                if (DOM.authOutput) DOM.authOutput.innerText = result;
            }

        } catch (error: any) {
            if (DOM.authOutput) DOM.authOutput.innerText = error.message;
        }
    })
}

async function registerApi(payload: { username: string, password: string }): Promise<string> {
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

async function loginApi(payload: { username: string, password: string }): Promise<string> {
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

        if (!Array.isArray(users)) throw new Error("Unexpected data");

        if (DOM.usersOutput) {
            DOM.usersOutput.innerHTML = "<strong>Users List:</strong><br>" +
                users.map(u => `- ${u.username} (password: ${u.password})`).join("<br>");
        }
    } catch (ex: any) {
        if (DOM.usersOutput) {
            DOM.usersOutput.innerText = ex.message || "Error fetching users";
        }
    }
}

async function checkToken(token: string): Promise<string> {
    const response = await fetch(`http://localhost:3000/api/token?token=${token}`, {
        method: 'GET'
    })

    const content = await response.text()
    return content
}

init();
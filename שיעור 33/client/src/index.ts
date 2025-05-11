type DOMAttr = {
    userName: HTMLInputElement | null, password: HTMLInputElement | null,
    registerResponse: HTMLDivElement | null,
    loginResponse: HTMLDivElement | null
}

const DOM: DOMAttr = {
    userName: null,
    password: null,
    registerResponse: null,
    loginResponse: null
}

function init() {
    DOM.userName = document.querySelector<HTMLInputElement>("#userName")
    DOM.password = document.querySelector<HTMLInputElement>("#password")
    DOM.registerResponse = document.querySelector("#registerResponse")
    DOM.loginResponse = document.querySelector("#loginResponse")
    document.getElementById("registerAction")?.addEventListener("click", async () => {
        try {
            const result = await registerApi({ userName: DOM.userName?.value as string, password: DOM.password?.value as string })
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = result;
            }
        } catch (ex: any) {
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = ex.message;
            }
        }

    })

    document.getElementById("loginAction")?.addEventListener("click", async () => {
        try {
            const userNameLogin = document.querySelector<HTMLInputElement>("#userNameLogin")?.value
            const passwordLogin = document.querySelector<HTMLInputElement>("#passwordLogin")?.value
            if (userNameLogin && passwordLogin) {
                const result = await loginApi({ userName: userNameLogin as string, password: passwordLogin as string })
                if (DOM.loginResponse) {
                    if (result.token) {
                        localStorage.setItem("token", result.token)
                    }
                    DOM.loginResponse.innerText = JSON.stringify(result);
                }
            }

        } catch (ex: any) {
            if (DOM.loginResponse) {
                DOM.loginResponse.innerText = ex.message;
            }
        }

    })

    document.getElementById("getUsersAction")?.addEventListener("click", async () => {
        try {
            const result = await getUsersApi()
            const element = document.querySelector("#getUsersResponse")
            if (element) {
                element.innerHTML = JSON.stringify(result)
            }
        } catch (ex: any) {
            alert("error")
        }

    })

    document.getElementById("getTokensAction")?.addEventListener("click", async () => {
        try {
            const result = await getTokensApi()
            const element = document.querySelector("#getTokensResponse")
            if (element) {
                element.innerHTML = JSON.stringify(result)
            }
        } catch (ex: any) {
            alert("error")
        }

    })

}

async function registerApi(payload: { userName: string, password: string }): Promise<string> {
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
async function loginApi(payload: { userName: string, password: string }): Promise<{ message: string, token: string }> {
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
            'Authorization': localStorage.getItem("token") as string || "",
            'Content-Type': 'application/json'
        }),
    });
    const content = await usersResponse.json();
    return content
}

async function getTokensApi() {
    const tokensResponse = await fetch('http://localhost:3000/api/tokens', {
        method: 'GET',
        headers: new Headers({
            'Authorization': localStorage.getItem("token") as string || "",
            'Content-Type': 'application/json'
        }),
    });
    const content = await tokensResponse.json();
    return content
}


init()




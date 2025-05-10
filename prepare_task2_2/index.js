const DOM = {
    loader: null,
    sendButton: null,
    tableDiv: null,
    tableHeaders: null,
    tableBody: null,
    postsDiv: null,
    postsHeaders: null,
    postsBody: null,
};

const usersURL = "https://jsonplaceholder.typicode.com/users";
const postsURL = "https://jsonplaceholder.typicode.com/posts";

const headersToDisplay = ["id", "name", "username", "email", "phone"];

function init() {
    DOM.loader = document.getElementById("loader");
    DOM.sendButton = document.getElementById("sendBtn");
    DOM.tableDiv = document.getElementById("tableDiv");
    DOM.tableHeaders = document.getElementById("users-table-headers");
    DOM.tableBody = document.getElementById("users-table-body");
    DOM.postsDiv = document.getElementById("postsDiv");
    DOM.postsHeaders = document.getElementById("posts-table-headers");
    DOM.postsBody = document.getElementById("posts-table-body");

    DOM.sendButton.addEventListener("click", async function () {
        try {
            clearTables();
            showLoader(DOM.loader, true);

            const [allUsers, allPosts] = await Promise.all([getUsersAPI(), getAllPostsAPI()]);
            //const allUsers = await getUsersAPI();
            console.log(allUsers);
            console.log(allPosts);

            createTableHeaders();
            createTableRows(allUsers);
            DOM.tableDiv.style.display = "table";

            createAllTableHeaders(allPosts[0]);
            createAllTableRows(allPosts);
            DOM.postsDiv.style.display = "table";
        } catch (error) {
            console.log(error);
        } finally {
            showLoader(DOM.loader, false);
        }
    });
}

init();

function showLoader(loaderElement, display) {
    if (typeof loaderElement !== "object") return;
    display ? (loaderElement.style.display = "") : (loaderElement.style.display = "none");
}

function clearTables() {
    DOM.tableHeaders.innerHTML = "";
    DOM.tableBody.innerHTML = "";
    DOM.tableDiv.style.display = "none";
    DOM.postsHeaders.innerHTML = "";
    DOM.postsBody.innerHTML = "";
    DOM.postsDiv.style.display = "none";
}

async function getUsersAPI() {
    const result = await fetch(usersURL);
    const data = await result.json();
    return data;
}

function createTableHeaders() {
    headersToDisplay.forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        DOM.tableHeaders.appendChild(th);
    });
}

function createTableRows(dataArray) {
    dataArray.forEach((item) => {
        const tr = document.createElement("tr");

        headersToDisplay.forEach((key) => {
            const td = document.createElement("td");

            const value = item[key];
            td.textContent = typeof value === "object" ? "[object]" : value;

            tr.appendChild(td);
        });

        DOM.tableBody.appendChild(tr);
    });
}

async function getAllPostsAPI() {
    const result = await fetch(postsURL);
    const data = await result.json();
    return data;
}

function createAllTableHeaders(firstItem) {
    const keys = Object.keys(firstItem);
    keys.forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        DOM.postsHeaders.appendChild(th);
    });
}

function createAllTableRows(dataArray) {
    dataArray.forEach((item) => {
        const tr = document.createElement("tr");
        Object.values(item).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        DOM.postsBody.appendChild(tr);
    });
}

const DOM = {
    loader: null,
    sendButton: null,
    pokeList: null,
};

const pokemonsURL = "https://pokeapi.co/api/v2/ability/?limit=20&offset=20";

function init() {
    DOM.loader = document.getElementById("loader");
    DOM.sendButton = document.getElementById("sendBtn");
    DOM.pokeList = document.getElementById("pokeList");

    DOM.sendButton.addEventListener("click", async function () {
        try {
            clearList("pokeList");
            showLoader(DOM.loader, true);
            const pokeResults = await getPokemonsAPI(pokemonsURL);
            console.log(pokeResults.results);
            insertDataToList(pokeResults.results, "pokeList");
        } catch (error) {
            console.log(error);
        } finally {
            showLoader(DOM.loader, false);
        }
    });
}

init();

function clearList(whatList) {
    if (typeof whatList !== "string") return;

    const targetList = document.getElementById(whatList);
    targetList.innerHTML = "";
}

function showLoader(loaderElement, display) {
    if (typeof loaderElement !== "object") return;
    display ? (loaderElement.style.display = "") : (loaderElement.style.display = "none");
}

async function getPokemonsAPI(urlToFetch) {
    const result = await fetch(urlToFetch);
    const data = await result.json();
    return data;
}

function insertDataToList(objToInsert, whatList) {
    if (typeof whatList !== "string" || typeof objToInsert !== "object") return;
    const targetList = document.getElementById(whatList);

    objToInsert.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name;

        li.addEventListener("click", async function () {
            // אם כבר נוצרה רשימה פנימית – להסיר אותה
            if (li.querySelector("ul")) {
                li.querySelector("ul").remove();
            } else {
                const data = await getPokemonsAPI(item.url);
                const entries = data.flavor_text_entries;
                const englishEntries = entries.filter((entry) => entry.language.name === "en");
                const uniqueTexts = [...new Set(englishEntries.map((entry) => entry.flavor_text))];

                const innerList = document.createElement("ul");

                uniqueTexts.forEach((text) => {
                    const newFlavor = document.createElement("li");
                    newFlavor.classList.add("small", "text-muted", "ms-3");
                    newFlavor.textContent = text;
                    innerList.appendChild(newFlavor);
                });

                li.appendChild(innerList);
            }
        });

        targetList.appendChild(li);
    });
}

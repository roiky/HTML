const DOM = {
    loader: null,
    coinsContent: null,
};

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>',
};

let trimmedCoins = [];
const mainCurrencyDataURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

async function init() {
    DOM.loader = document.getElementById("loader");
    DOM.coinsContent = document.getElementById("coinsContent");

    const coinsData = await getApiData(mainCurrencyDataURL);
    trimmedCoins = coinsData.map((coin) => {
        return {
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.image,
        };
    });
    console.log(trimmedCoins);
    loadCards(trimmedCoins, "coinsContent");
}
init();

async function getApiData(urlToFetch) {
    const result = await fetch(urlToFetch);
    const data = await result.json();
    return data;
}

function LStoArray(LSName) {
    let LSstring = localStorage.getItem(LSName);

    if (!LSstring) {
        console.log(`${LSName} do not exist in LocalStorage!`);
        return [];
    }

    try {
        return JSON.parse(LSstring);
    } catch (error) {
        console.log(error);
        return [];
    }
}

function loadCards(array, targetContent, action = "add") {
    if (!Array.isArray(array)) return; // validate that arrayOfCars is array
    const content = document.getElementById(targetContent); // Tomer remind me!
    if (!content) return;
    content.innerHTML = "";
    for (let index = 0; index < array.length; index++) {
        const currentObject = array[index];
        const cardHtml = createCard(currentObject, action);
        content.appendChild(cardHtml);
    }
}

function isInLS(jid, LSName) {
    const favoritesJokesString = localStorage.getItem(LSName);
    const TempFavArr = JSON.parse(favoritesJokesString);
    if (!TempFavArr) return false;

    for (let index = 0; index < TempFavArr.length; index++) {
        const currentObj = TempFavArr[index];
        if (currentObj.imdbID === jid) {
            return true;
        }
    }
}

function createCard(coinObj) {
    const { id, symbol, name, image } = coinObj;

    const card = document.createElement("div");
    card.classList.add("card", "col-md-3", "m-2", "p-2", "shadow");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // שם המטבע
    const upperDiv = document.createElement("div");
    upperDiv.classList.add("d-flex", "justify-content-between");

    // תמונה
    const icon = document.createElement("img");
    icon.src = image;
    icon.alt = name;
    icon.style.width = "50px";

    const titleDiv = document.createElement("div");

    titleDiv.classList.add("flex-column");

    const title = document.createElement("h5");
    title.classList.add("card-title", "text-capitalize");
    title.textContent = name;

    const subtitle = document.createElement("small");
    subtitle.classList.add("text-muted", "fw-bold", "text-uppercase");
    subtitle.textContent = symbol.toUpperCase();

    titleDiv.append(title, subtitle);

    // Toggle Switch (placeholder)
    const switchContainer = document.createElement("div");
    switchContainer.innerHTML = `
        <div class="form-check form-switch d-flex justify-content-center">
            <input class="form-check-input" type="checkbox" role="switch" id="switch-${id}">
        </div>
    `;

    upperDiv.append(icon, titleDiv, switchContainer);

    // כפתור More Info (placeholder כרגע)
    const moreInfoBtn = document.createElement("button");
    moreInfoBtn.textContent = "More Info";
    moreInfoBtn.classList.add("btn", "btn-outline-warning", "btn-sm", "m-1", "w-100");

    // הרכבת הכרטיס
    cardBody.append(upperDiv, moreInfoBtn);
    card.appendChild(cardBody);

    return card;
}

function getObjById(id, fromArray) {
    if (!Array.isArray(fromArray)) return;
    for (let index = 0; index < fromArray.length; index++) {
        const current = fromArray[index];
        if (current.imdbID === id) {
            return current;
        }
    }
}

function addOrRemoveFromFav(id, LSName) {
    const itemToFavorites = getObjById(id, movies);

    const checkLS = localStorage.getItem(LSName);
    if (!checkLS) {
        const favoritesArray = [];
        const favoritesArrayString = JSON.stringify(favoritesArray);
        localStorage.setItem(LSName, favoritesArrayString);
    }

    if (itemToFavorites) {
        const favoritesJokesString = localStorage.getItem(LSName);
        if (favoritesJokesString) {
            const itemTitle = getValuebyKey(movies, "imdbID", id, "Title");
            let favoritesArray = JSON.parse(favoritesJokesString);
            const found = getObjById(id, favoritesArray);

            if (!found) {
                favoritesArray.push(itemToFavorites);
                const favoritesArrayString = JSON.stringify(favoritesArray);
                console.log(favoritesArray);
                localStorage.setItem(LSName, favoritesArrayString);
                console.log(`item id: ${id} added to "${LSName}"!`);
                alertify.warning(`"${itemTitle}" added to favorites!`);
            } else {
                const itemIndex = favoritesArray.findIndex(function (item) {
                    return item.imdbID === id;
                });
                favoritesArray.splice(itemIndex, 1);
                const favoritesArrayString = JSON.stringify(favoritesArray);
                localStorage.setItem(LSName, favoritesArrayString);
                console.log(`item id: ${id} removed from "${LSName}"!`);
                alertify.error(`"${itemTitle}" removed from favorites!`);
            }
        }
    }
}

function aggregateTypes(arr, keyToCount) {
    if (!Array.isArray(arr)) return;
    let stats = {};
    arr.forEach(function (currentItem) {
        if (stats[currentItem[keyToCount]]) {
            // if true we have something in the object under the relevant key
            stats[currentItem[keyToCount]] = stats[currentItem[keyToCount]] + 1;
        } else {
            stats[currentItem[keyToCount]] = 1;
        }
    });
    return stats;
}

function getValuebyKey(arr, keySent, keyValue, valueToGet) {
    if (!Array.isArray(arr)) return;

    const item = arr.find(function (item) {
        return item[keySent] === keyValue;
    });

    if (!item) return undefined;
    if (item) return item[valueToGet];
}

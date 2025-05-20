const DOM = {
    loader: null,
    coinsContent: null,
    searchInput: null,
    errorOutput: null,
};

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>',
};

let trimmedCoins = [];
let filteredCoins = [];
const mainCurrencyDataURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
const specificCoinData = "https://api.coingecko.com/api/v3/coins/";

async function init() {
    DOM.loader = document.getElementById("loader");
    DOM.coinsContent = document.getElementById("coinsContent");
    DOM.searchInput = document.getElementById("searchInput");
    DOM.errorOutput = document.getElementById("errorOutput");

    setErrorMessage(DOM.errorOutput, "test"); //move it later to when 0 resuls

    try {
        showLoader(DOM.loader, true);
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
        DOM.searchInput.value = "";
        loadCards(trimmedCoins, "coinsContent");
        filteredCoins = trimmedCoins;
    } catch (error) {
        console.log(error);
    } finally {
        showLoader(DOM.loader, false);
    }

    DOM.searchInput.addEventListener("input", (event) => {
        let userInput = event.target.value.toLowerCase();
        console.log(userInput);

        filteredCoins = trimmedCoins.filter((coin) => {
            //i filter trimmedCoins so when the user search i wont delete the original fetched data!
            return coin.name.toLowerCase().includes(userInput) || coin.symbol.toLowerCase().includes(userInput);
        });

        if (filteredCoins.length === 0) {
            setErrorMessage(DOM.errorOutput, "No results found!");
            loadCards([], "coinsContent");
        } else {
            console.log(filteredCoins);
            setErrorMessage(DOM.errorOutput, "");
            loadCards(filteredCoins, "coinsContent");
        }
    });
}
init();

//======================[START]-[custom functions]======================

function loadCards(array, targetContent) {
    if (!Array.isArray(array)) return;
    const content = document.getElementById(targetContent);
    if (!content) return;
    content.innerHTML = "";
    for (let index = 0; index < array.length; index++) {
        const currentObject = array[index];
        const cardHtml = createCard(currentObject);
        content.appendChild(cardHtml);
    }
}

function createCard(coinObj) {
    const { id, symbol, name, image } = coinObj;

    const card = document.createElement("div");
    card.classList.add("card", "col-md-3", "m-2", "p-2", "shadow");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const upperDiv = document.createElement("div");
    upperDiv.classList.add("d-flex", "justify-content-between");

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

    const switchInput = switchContainer.querySelector("input");

    //======================[START]-[select coins to LS]======================
    if (isInLS(symbol, "trackedCoins")) {
        switchInput.checked = true;
    }

    switchInput.addEventListener("change", () => {
        let tracked = LStoArray("trackedCoins");

        if (switchInput.checked) {
            if (tracked.length >= 5) {
                switchInput.checked = false;
                //alert("You can only track up to 5 coins.");
                buildLimitExceededModal(symbol);
                return;
            }
            tracked.push(symbol.toUpperCase());
        } else {
            tracked = tracked.filter((sym) => sym !== symbol.toUpperCase());
        }

        updateLSArray("trackedCoins", tracked);
    });
    //======================[END]-[select coins to LS]======================

    upperDiv.append(icon, titleDiv, switchContainer);

    const collapserDiv = document.createElement("div");
    collapserDiv.classList.add("collapse", "mt-2", "mb-1");
    collapserDiv.id = `collapse-${symbol}`;
    //collapserDiv.innerHTML = "test";

    const moreInfoBtn = document.createElement("button");
    moreInfoBtn.textContent = "More Info";
    moreInfoBtn.classList.add("btn", "btn-outline-warning", "btn-sm", "m-1", "w-100");
    moreInfoBtn.setAttribute("data-bs-toggle", "collapse");
    moreInfoBtn.setAttribute("data-bs-target", `#collapse-${symbol}`);

    //======================[START]-[MoreInfo to fetch data about coin]======================
    moreInfoBtn.addEventListener("click", async () => {
        const collapseTarget = document.getElementById(`collapse-${symbol}`);

        try {
            const data = await getApiData(specificCoinData + id);
            const prices = data.market_data.current_price;
            collapseTarget.innerHTML = ``;
            const usd = document.createElement("p");
            usd.classList.add("mb-0", "small");
            usd.innerHTML = `<strong>USD:</strong> $${prices.usd.toLocaleString()}`;

            const eur = document.createElement("p");
            eur.classList.add("mb-0", "small");
            eur.innerHTML = `<strong>EUR:</strong> €${prices.eur.toLocaleString()}`;

            const ils = document.createElement("p");
            ils.classList.add("mb-0", "small");
            ils.innerHTML = `<strong>ILS:</strong> ₪${prices.ils.toLocaleString()}`;

            collapseTarget.append(usd, eur, ils);
        } catch (error) {
            console.log(error);
            collapseTarget.innerHTML = `<div class="text-danger">Failed to load coin data</div>`;
        }
    });
    //======================[END]-[MoreInfo to fetch data about coin]======================

    cardBody.append(upperDiv, collapserDiv, moreInfoBtn);
    card.appendChild(cardBody);

    return card;
}

function buildLimitExceededModal(newSymbol) {
    let modalDiv = document.getElementById("limitModal");
    let modal;

    if (modalDiv) {
        modal = bootstrap.Modal.getOrCreateInstance(modalDiv);
        const container = modalDiv.querySelector("#modalSymbolsContainer");

        container.innerHTML = "";
        modal.show();
        const strongEl = modalDiv.querySelector("strong");
        if (strongEl) {
            strongEl.textContent = newSymbol.toUpperCase();
        }
    } else {
        // יצירה ראשונית של ה־modal
        modalDiv = document.createElement("div");
        modalDiv.classList.add("modal", "fade");
        modalDiv.id = "limitModal";
        modalDiv.tabIndex = -1;
        modalDiv.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">You've reached the limit</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>You can only track 5 coins<br>
                        Please select one symbol to remove and make room for <strong>${newSymbol.toUpperCase()}</strong>:</p>
                        <div id="modalSymbolsContainer" class="d-flex flex-column gap-1"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
        modal = new bootstrap.Modal(modalDiv);
        modal.show();
    }

    // בניית כפתורים מעודכנים
    const container = modalDiv.querySelector("#modalSymbolsContainer");
    const tracked = LStoArray("trackedCoins");

    tracked.forEach((symbol) => {
        const row = document.createElement("div");
        row.classList.add("d-flex", "align-items-center", "p-2", "gap-2");

        const label = document.createElement("span");
        label.textContent = symbol.toUpperCase();

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "❌";
        removeBtn.style.background = "none";
        removeBtn.style.border = "none";
        //removeBtn.classList.add("btn", "btn-sm", "btn-danger");

        removeBtn.addEventListener("click", () => {
            let updated = tracked.filter((sym) => sym !== symbol);
            updated.push(newSymbol.toUpperCase());
            updateLSArray("trackedCoins", updated);
            modal.hide();

            loadCards(filteredCoins, "coinsContent");
        });

        row.append(removeBtn, label);
        container.appendChild(row);
    });
}

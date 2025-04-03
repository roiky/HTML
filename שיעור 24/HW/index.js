const DOM = {
    loader: null,
    countriesDDL: null,
    sendButton: null,
    countriesContent: null,
};

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>',
    X: '<i class="bi bi-x"></i>',
    ARROW_RIGHT: `<i class="bi bi-arrow-right"></i>`,
    ARROW_LEFT: `<i class="bi bi-arrow-left"></i>`,
    BAG_ADD: `<i class="bi bi-bag-plus"></i>`,
};

function init() {
    DOM.loader = document.getElementById("loader"); //showLoader(DOM.loader);
    DOM.countriesDDL = document.getElementById("countriesSelect");
    DOM.sendButton = document.getElementById("sendBtn");
    DOM.countriesContent = document.getElementById("countryDetailsContent");

    loadCountriesToDDL();

    DOM.sendButton.addEventListener("click", async function () {
        console.log(DOM.countriesDDL.value);
        try {
            showLoader(DOM.loader, true);
            const country = await getSpecificCountryByCode(DOM.countriesDDL.value);
            if (country) {
                console.log(country);
                cleanContent("countryDetailsContent");
                drawCountryFlag(country, "countryDetailsContent");
            }
        } catch (error) {
            console.log(error);
        } finally {
            showLoader(DOM.loader, false);
        }
    });
}

init();

async function getCountriesFromAPI() {
    const result = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await result.json();
    return data;
}

async function loadCountriesToDDL() {
    showLoader(DOM.loader, true);
    try {
        const fetchResult = await getCountriesFromAPI();
        console.log(fetchResult, "drawing...");

        fetchResult.forEach((currentCountry) => {
            const optionElement = document.createElement("option");
            optionElement.value = currentCountry.cca3;
            optionElement.innerText = currentCountry?.name?.common;

            DOM.countriesDDL.appendChild(optionElement);
        });
    } catch (error) {
        console.log(`something went wrong!`, error);
    } finally {
        showLoader(DOM.loader, false);
    }
}

async function getSpecificCountryByCode(code) {
    const result = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await result.json(); // await = take only the value.
    const firstCountry = data[0];

    const countryFlag = await fetch(firstCountry?.flags?.svg); //works but gives you the SVG text, if i want just the picture URL i dont need to "fetch" that!
    const svgText = await countryFlag.text();

    return {
        name: firstCountry?.name?.common,
        flag: firstCountry?.flags?.png,
    };
}

function drawCountryFlag(item, whereToDraw) {
    const targetElement = document.getElementById(whereToDraw);

    const newDiv = document.createElement("div");
    newDiv.classList.add("d-inline-block", "w-auto", "p-2", "mt-2", "mr-2", "border");
    newDiv.style.border = "1px solid black";
    const countryName = document.createElement("h3");
    countryName.innerText = item.name;

    const countryFlag = document.createElement("img");
    countryFlag.src = item.flag;

    newDiv.append(countryName, countryFlag);
    targetElement.appendChild(newDiv);
}

function cleanContent(whereToClean) {
    const targetElement = document.getElementById(whereToClean);
    targetElement.innerHTML = "";
}

function showLoader(loaderElement, display) {
    display ? (loaderElement.style.display = "") : (loaderElement.style.display = "none");
}

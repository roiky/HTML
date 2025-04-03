const DOM = {
    loader: null,
    countriesDDL: null,
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

    loadCountriesToDDL();
}

init();

async function getCountriesFromAPI() {
    const result = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await result.json();
    return data;
}

async function loadCountriesToDDL() {
    showLoader(DOM.loader);
    try {
        const fetchResult = await getCountriesFromAPI();
        console.log(fetchResult, "drawing...");
        fetchResult.forEach((currentCountry) => {
            const optionElement = `<option value='${currentCountry.cca3}'> ${currentCountry?.name?.common} </option>`;
            DOM.countriesDDL.innerHTML += optionElement;
        });
    } catch (error) {
        console.log(`something went wrong!`, error);
    } finally {
        hideLoader(DOM.loader);
    }
}

function showLoader(loaderElement) {
    loaderElement.style.display = "";
}

function hideLoader(loaderElement) {
    loaderElement.style.display = "none";
}

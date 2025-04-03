const DOM = {
    loader: null,
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
    const countriesArr = getCountriesFromAPI();
    loadCountriesToDDL();
}

init();

async function getCountriesFromAPI() {
    const fetchURL = ``;
}

function showLoader(loaderElement) {
    loaderElement.style.display = "";
}

function hideLoader(loaderElement) {
    loaderElement.style.display = "none";
}

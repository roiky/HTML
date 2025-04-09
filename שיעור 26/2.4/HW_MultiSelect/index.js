const DOM = {
    loader: null,
    countriesDDL: null,
    sendButton: null,
    countriesContent: null,
};

let charts = {};

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

async function init() {
    DOM.loader = document.getElementById("loader");
    DOM.countriesDDL = document.getElementById("countriesSelect");
    DOM.sendButton = document.getElementById("sendBtn");
    DOM.countriesContent = document.getElementById("countryDetailsContent");

    await loadCountriesToDDL();
    countriesMultiDDL = createMultiselectDropdown("countriesSelect", "Select Countries");

    DOM.sendButton.addEventListener("click", async function () {
        const selectedValues = Array.from(DOM.countriesDDL.selectedOptions).map((option) => option.value);
        console.log(selectedValues);
        try {
            if (selectedValues) {
                cleanContent("countryDetailsContent");
                showLoader(DOM.loader, true);
                await drawMultiCountryFlag(selectedValues, "countryDetailsContent");
            }
        } catch (error) {
            console.log(error);
        } finally {
            showLoader(DOM.loader, false);
            countriesMultiDDL.removeActiveItems();
        }
    });

    //showLoader(DOM.loader, true);
}

init();

async function drawMultiCountryFlag(arr, whereToDraw) {
    if (!Array.isArray(arr) || typeof whereToDraw !== "string") return;
    const allPromieses = arr.map((code) => getSpecificCountryByCode(code));
    const result = await Promise.allSettled(allPromieses);
    const onlySuccesed = result.filter((item) => item.status === "fulfilled").map((item) => item.value);
    onlySuccesed.forEach((country) => drawCountryFlag(country, whereToDraw));
}

function createMultiselectDropdown(dropdownID, placeholder = "placeholder") {
    if (typeof dropdownID !== "string") return;
    const element = document.getElementById(dropdownID);
    const choices = new Choices(element, {
        removeItemButton: true,
        searchEnabled: true,
        placeholder: true,
        placeholderValue: placeholder,
        itemSelectText: "",
    });
    return choices;
    //document.querySelector(".choices").style.maxWidth = "600px";
}

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

        const regionCounter = countSomething(fetchResult, "region");
        const populationCounter = sumByKeys(fetchResult, "region", "population");
        console.log(regionCounter); // return obj with all regions!
        createChart(regionCounter, "firstChart", "Regions Pie");
        createChart(populationCounter, "secondChart", "Population Pie");
    } catch (error) {
        console.log(`something went wrong!`, error);
    } finally {
        showLoader(DOM.loader, false);
    }
}

function countSomething(arr, countWhat) {
    if (!Array.isArray(arr) || typeof countWhat !== "string") return;
    const regionsObj = {};
    arr.forEach((country) => {
        const key = country[countWhat];
        if (key) {
            if (regionsObj[key]) {
                regionsObj[key] += 1;
            } else {
                regionsObj[key] = 1;
            }
        }
    });
    return regionsObj;
}

function sumByKeys(arr, categories, whatToCount) {
    if (!Array.isArray(arr) || typeof categories !== "string" || typeof whatToCount !== "string") return;
    const resultObj = {};
    arr.forEach((country) => {
        const category = country[categories];
        const keyToCount = country[whatToCount];
        if (category != null && keyToCount != null) {
            if (resultObj[category]) {
                resultObj[category] += country[whatToCount];
            } else {
                resultObj[category] = country[whatToCount];
            }
        }
    });
    return resultObj;
}

async function getSpecificCountryByCode(code) {
    if (typeof code !== "string") return;
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
    if (typeof item !== "object" || typeof whereToDraw !== "string") return;
    const targetElement = document.getElementById(whereToDraw);

    const newDiv = document.createElement("div");
    newDiv.classList.add("p-2", "mt-2", "border", "mx-auto");
    newDiv.style.width = "fit-content";
    newDiv.style.border = "1px solid black";
    const countryName = document.createElement("h3");
    countryName.innerText = item.name;

    const countryFlag = document.createElement("img");
    countryFlag.src = item.flag;

    newDiv.append(countryName, countryFlag);
    targetElement.appendChild(newDiv);
}

function cleanContent(whereToClean) {
    if (typeof whereToClean !== "string") return;
    const targetElement = document.getElementById(whereToClean);
    targetElement.innerHTML = "";
}

function showLoader(loaderElement, display) {
    if (typeof loaderElement !== "object") return;
    display ? (loaderElement.style.display = "") : (loaderElement.style.display = "none");
}

function createChart(obj, canvasID, chartTitle = "Title") {
    const content = document.querySelector(`#${canvasID}`);
    content.style.border = "2px solid rgba(85, 75, 63, 0.23)";
    content.style.borderRadius = "10px";

    if (!content) return;

    let labels = [];
    let data = [];
    for (const property in obj) {
        labels.push(property);
        data.push(obj[property]);
    }

    //const ctx = content.querySelector(`#${canvasID}`)
    //const ctx = document.getElementById('myChart');

    if (charts[canvasID]) {
        charts[canvasID].destroy();
    }
    charts[canvasID] = new Chart(content, {
        type: "pie",
        borderColor: "rgba(0, 0, 0, 0.1)",

        data: {
            labels: labels,
            datasets: [
                {
                    label: "Counter",
                    data: data,
                    borderWidth: 2,
                    //backgroundColor: ["rgb(21, 7, 102)", "rgb(100, 16, 16)"],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                //   y: {
                //     beginAtZero: true
                //   }
            },
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 20,
                    },
                    color: "black",
                    padding: {
                        top: 0,
                        bottom: 0,
                    },
                },
            },
        },
    });
}

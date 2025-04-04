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

        const regionCounter = countSomething(fetchResult, "region");
        const populationCounter = countByKeys(fetchResult, "region", "population");
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

function countByKeys(arr, categories, whatToCount) {
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

const DOM = {
    loader: null,
    sendButton: null,
    cardsContainer: null,
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

const populationURL = `https://datausa.io/api/data?drilldowns=Nation&measures=Population`;
const uniURL = `https://datausa.io/api/searchLegacy/?limit=10&dimension=University&hierarchy=University&q=`;

async function init() {
    DOM.loader = document.getElementById("loader");
    DOM.sendButton = document.getElementById("sendBtn");
    DOM.cardsContainer = document.getElementById("cardsContainer");

    //showLoader(DOM.loader, true);

    DOM.sendButton.addEventListener("click", async function () {
        try {
            cleanContent("firstChart");
            cleanContent("cardsContainer");
            showLoader(DOM.loader, true);

            const [populationObj, uniObj] = await Promise.all([getPopulationAPI(), getUniAPI()]);

            console.log(populationObj);
            const popByYear = sumByKeys(populationObj.data, "Year", "Population");
            console.log(popByYear);
            createChart(popByYear, "firstChart", "Population By Year", "bar");
            console.log(uniObj.results);

            uniObj.results.forEach((uni) => drawUniCards(uni, "cardsContainer"));
        } catch (error) {
            console.log(error);
        } finally {
            showLoader(DOM.loader, false);
        }
    });
    //showLoader(DOM.loader, true);
}

init();

async function getPopulationAPI() {
    const result = await fetch(populationURL);
    const data = await result.json();
    return data;
}

async function getUniAPI() {
    const result = await fetch(uniURL);
    const data = await result.json();
    return data;
}

function drawUniCards(item, whereToDraw) {
    if (typeof item !== "object" || typeof whereToDraw !== "string") return;
    const targetElement = document.getElementById(whereToDraw);

    const newDiv = document.createElement("div");
    newDiv.id = item.id;
    newDiv.classList.add("card", "mt-2", "text-center");
    newDiv.style.width = "fit-content";
    newDiv.style.border = "1px solid black";
    newDiv.style.width = "300px";
    newDiv.style.margin = "20px";

    const cardBadge = window.document.createElement("p");
    const badge = window.document.createElement("span");
    badge.classList.add("badge", "badge-light", "mt-2");
    badge.style.background = "#a0a0a0";
    badge.style.color = "#191716";
    badge.textContent = item.name;

    cardBadge.appendChild(badge);

    const ID = document.createElement("p");
    ID.innerHTML = `<b>University ID: </b>`;
    ID.innerHTML += item.id;

    const Score = document.createElement("p");
    Score.innerHTML = `<b>University Score: </b>`;
    if (!item.score) {
        Score.innerHTML += `Not Available! `;
    } else {
        Score.innerHTML += item.score.toFixed(4);
    }

    newDiv.append(cardBadge, ID, Score);
    targetElement.appendChild(newDiv);
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

function cleanContent(whereToClean) {
    if (typeof whereToClean !== "string") return;
    const targetElement = document.getElementById(whereToClean);
    targetElement.innerHTML = "";
}

function showLoader(loaderElement, display) {
    if (typeof loaderElement !== "object") return;
    display ? (loaderElement.style.display = "") : (loaderElement.style.display = "none");
}

function createChart(obj, canvasID, chartTitle = "Title", chartType = "pie") {
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
        type: chartType,
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

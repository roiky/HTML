const DOM = {
    loader: null,
    trackerContent: null,
    mainNavbar: null,
    errorOutput: null,
    chart: null,
};

let liveChart;
let chartLabels = [];
let chartData = {};
let updateInterval;
const updateSeconds = 1;
const resetChartMinutes = 20;
let trackedSymbols = [];
const specificURL = "https://min-api.cryptocompare.com/data/pricemulti?tsyms=usd&fsyms=";

async function init() {
    DOM.loader = document.getElementById("loader");
    DOM.trackerContent = document.getElementById("trackerContent");
    DOM.mainNavbar = document.getElementById("mainNavbar");
    DOM.errorOutput = document.getElementById("errorOutput");
    DOM.chart = document.getElementById("firstChart");

    //setErrorMessage(DOM.errorOutput, "TEST");
    trackedSymbols = LStoArray("trackedCoins");
    loadSymbolsToNavbar("mainNavbar", trackedSymbols);
    if (!trackedSymbols.length) {
        setErrorMessage(DOM.errorOutput, "No coins were selected!");
    } else {
        try {
            const coinsPricesObj = await getApiData(specificURL + trackedSymbols);
            console.log(coinsPricesObj);
            startLiveChart("firstChart");
        } catch (error) {
            console.log("error:", error);
        }
    }

    setTimeout(() => {
        stopChart(liveChart, updateInterval);
        setErrorMessage(DOM.errorOutput, `Chart is stopped automatically after ${resetChartMinutes} minutes from site loaded`);
        DOM.chart.style.display = "none";
    }, resetChartMinutes * 60 * 1000);
}
init();

//======================[START]-[custom functions]======================

function loadSymbolsToNavbar(targetContent, symbolsArr) {
    if (typeof targetContent !== "string" || !Array.isArray(symbolsArr)) return;

    const content = document.getElementById(targetContent);

    const symbolsDiv = document.createElement("div");
    symbolsDiv.classList.add("text-warning");

    if (symbolsArr.length === 0) {
        symbolsDiv.innerHTML = `No symbols were selected`;
    } else {
        symbolsDiv.innerHTML = `Tracked Symbols:<strong> [ ${symbolsArr.join(" ")} ]</strong>`;
    }

    content.append(symbolsDiv);
}

//======================[START]-[create chart]======================
async function startLiveChart(whereToDraw) {
    if (typeof whereToDraw !== "string") return;
    chartLabels = [];
    chartData = {};

    trackedSymbols.forEach((symbol) => {
        chartData[symbol] = [];
    });

    const datasets = trackedSymbols.map((symbol) => ({
        label: symbol,
        data: [],
        fill: false,
        tension: 0.4,
    }));

    const ctx = document.getElementById(whereToDraw);
    ctx.classList.add("chartStyle");
    // ctx.style.border = "2px solid black";
    // ctx.style.borderRadius = "10px";

    liveChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: chartLabels,
            datasets: datasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Live Crypto Prices",
                    font: { size: 20 },
                    color: "black",
                },
            },
        },
    });

    updateInterval = setInterval(fetchAndUpdatePrices, updateSeconds * 1000);
}
//======================[END]-[create chart]======================

//======================[START]-[update price]======================
async function fetchAndUpdatePrices() {
    try {
        const data = await getApiData(specificURL + trackedSymbols);
        const timestamp = new Date().toLocaleTimeString();

        chartLabels.push(timestamp);

        trackedSymbols.forEach((symbol) => {
            const price = data[symbol]?.USD || 0;
            chartData[symbol].push(price);
        });

        liveChart.data.labels = chartLabels;
        liveChart.data.datasets.forEach((dataset) => {
            dataset.data = chartData[dataset.label];
        });

        liveChart.update();
    } catch (err) {
        console.log("Failed to fetch live prices:", err);
    }
}
//======================[END]-[update price]======================

function stopChart(whatChart, pricesInterval) {
    chartLabels = [];
    trackedSymbols.forEach((symbol) => {
        chartData[symbol] = [];
    });

    whatChart.data.labels = chartLabels;

    whatChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    whatChart.update();
    clearInterval(pricesInterval);
}

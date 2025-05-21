const DOM = {
  loader: null,
  trackerContent: null,
  mainNavbar: null,
  errorOutput: null,
};

const BSIcons = {
  PLUS: '<i class="bi bi-plus"></i>',
  STAR: '<i class="bi bi-star-fill"></i>',
  TRASH: '<i class="bi bi-trash3-fill"></i>',
  WAIT: '<i class="bi bi-clock"></i>',
};

let selectedSymbols = [];

async function init() {
  DOM.loader = document.getElementById("loader");
  DOM.trackerContent = document.getElementById("trackerContent");
  DOM.mainNavbar = document.getElementById("mainNavbar");
  DOM.errorOutput = document.getElementById("errorOutput");

  setErrorMessage(DOM.errorOutput, "TEST");
  loadSymbolsToNavbar("mainNavbar");
}
init();

//======================[START]-[custom functions]======================

function loadSymbolsToNavbar(targetContent) {
  if (typeof targetContent !== "string") return;

  const content = document.getElementById(targetContent);

  const symbolsDiv = document.createElement("div");
  symbolsDiv.classList.add("text-warning");
  const trackedSymbols = LStoArray("trackedCoins").join(" ");
  symbolsDiv.innerHTML = `Tracked Symbols:<strong> [ ${trackedSymbols} ]</strong>`;

  content.append(symbolsDiv);
}

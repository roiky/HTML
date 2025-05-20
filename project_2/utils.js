async function getApiData(urlToFetch) {
    const result = await fetch(urlToFetch);
    const data = await result.json();
    return data;
}

function showLoader(loaderElement, display) {
    if (typeof loaderElement !== "object") return;
    display ? (loaderElement.style.display = "") : (loaderElement.style.display = "none");
}

function setErrorMessage(messageElement, message) {
    if (typeof message !== "string") return;
    messageElement.innerHTML = "";
    messageElement.textContent = message;
}

function LStoArray(LSName) {
    const LSstring = localStorage.getItem(LSName);

    if (!LSstring) {
        localStorage.setItem(LSName, JSON.stringify([]));
        return [];
    }

    try {
        const parsed = JSON.parse(LSstring);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log(`Failed to parse localStorage item "${LSName}":`, error);
        return [];
    }
}

function isInLS(value, LSName) {
    const stored = LStoArray(LSName);
    return stored.includes(value.toUpperCase());
}

function updateLSArray(key, array) {
    if (!Array.isArray(array)) return;

    try {
        localStorage.setItem(key, JSON.stringify(array));
    } catch (error) {
        console.log(`Failed to update localStorage key "${key}"`);
    }
}

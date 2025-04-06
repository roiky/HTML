
const DOM = {
    sendButton: null,
    currencyInput: null,
    currencyContainer: null,
};

function init(){
    DOM.sendButton = document.getElementById("sendBtn");
    DOM.currencyInput = document.getElementById("usrCurrency")
    DOM.currencyContainer = document.getElementById("currencyContainer")

    DOM.sendButton.addEventListener("click",function(){
        //console.log("TEST")
        const currentValue = DOM.currencyInput.value.toUpperCase()
        searchCountry(currentValue)
        console.log(dataCountry[currentValue])
    })

}

init();

console.log(dataCountry)

// O(1)
function getCountryByCode(dataCountry, currency) {
    return dataCountry[currency]
}

// O(1)
function searchCountry(currency) {
    const c = getCountryByCode(dataCountry, currency)
    //console.log(c)
    DOM.currencyContainer.innerHTML = ""
    c.forEach(element => {
        DOM.currencyContainer.innerHTML += `${element} <br>`
    });
}

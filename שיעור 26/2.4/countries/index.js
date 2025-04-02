const DOM = {
    selectCountry: null,
    loader: null,
    sendButtom: null,
    countryContent: null,
}

function init() {
    DOM.selectCountry = document.getElementById("countriesSelect")
    DOM.loader = document.getElementById("loader")
    DOM.sendButtom = document.getElementById("sendBtn")
    DOM.countryContent = document.getElementById("countryDetailsContent")

    //showLoader()

    DOM.sendButtom.addEventListener("click", function(){
        try {
            showLoader()
            DOM.countryContent.innerHTML = ``
            selected = getSelectedCountries()
            getMultiCountriesByCode(selected)
        } catch (error) {
            console.log(error)
        } finally{
            hideLoader()
        }

    })

    // DOM.selectCountry.addEventListener("click", async function () {
    //     try {
    //         showLoader()
    //         const c = await getCountryByCode(this.value)
    //         if (c) {
    //             drawCountryDetails(c)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         hideLoader()
    //     }
    //     getSelectedCountries()
    // })
    showCountriesNames()
}



function getSelectedCountries(){
    const selectedValues = [];
    for (const country of DOM.selectCountry.selectedOptions) {
        selectedValues.push(country.value);
    }
    console.log(selectedValues);

    return selectedValues
}

async function getMultiCountriesByCode(arr){
    const allPromieses = arr.map(code => getCountryByCode(code))
    const result = await Promise.allSettled(allPromieses)
    result.forEach((currentPromise) => {
        if(currentPromise.status === "fulfilled"){
            drawCountryDetails(currentPromise.value)
        }
    })
}

function drawCountriesSelect(data) {
    if (!Array.isArray(data)) return;
    console.log(data, "drawing...")
    data.forEach((currentCountry) => {
        const optionElement = `<option value='${currentCountry.cca3}'> ${currentCountry?.name?.common} </option>`
        DOM.selectCountry.innerHTML += optionElement
    })
}
async function showCountriesNames() {
    try {
        const result = await getCountriesApi()
        drawCountriesSelect(result)
    }
    catch (ex) {
        console.log(ex)
        alert("Something went wrong!")
    }
    finally {
        console.log("another async function done running")
    }
}
async function getCountriesApi() {
    const result = await fetch(`https://restcountries.com/v3.1/all`)
    const data = await result.json()
    return data
}
async function getCountryByCode(code) {
    const result = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    const data = await result.json()
    const [firstCountry] = data

    const svgFlag = await fetch(firstCountry?.flags?.svg)
    const svgText = await svgFlag.text()

    return {
        name: firstCountry?.name?.official,
        flag: firstCountry?.flags?.svg,
        svgText
    }
}

function drawCountryDetails(country) {
    const content = document.getElementById("countryDetailsContent")
    content.innerHTML += `<div>  
    <h1> ${country.name} </h1>
    <img src=${country.flag} height=200 width=200    />
    </div> `
    // ${country.svgText}
    // `

}

function drawMultiCountries(arr) {
    const content = document.getElementById("countryDetailsContent")
    content.innerHTML = ``
    content.innerHTML += `<div>  
    <h1> ${country.name} </h1>
    <img src=${country.flag} height=200 width=200    />
    </div> `
    // ${country.svgText}
    // `

}
function showLoader() {
    DOM.loader.style.display = "flex"
}
function hideLoader() {
    DOM.loader.style.display = "none"
}
init()


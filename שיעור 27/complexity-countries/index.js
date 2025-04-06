console.log(data)


const countriesObj = {}

data.forEach(c => {
    countriesObj[c.currencies] = c.cca3
});

//console.log(JSON.stringify(countriesObj))

console.log(JSON.stringify(getCountriesByCurrency(data)))


// O(n)
function getCountryByCode(array, code) {
    return array.find(c => c.cca3 === code)
}

// O(n)
function searchCountry() {
    const result = prompt("Enter country code")
    console.log(getCountryByCode(data, result))

}

function getCountriesByCurrency(data) {
    const result = {};
    
    data.forEach((country) => {
        if (country.currencies && country.name.common) {
            Object.keys(country.currencies).forEach((currencyCode) => {
                if (!result[currencyCode]) {
                    result[currencyCode] = [];
                }
                result[currencyCode].push(country.name.common);
            });
        }
    });

    return result;
}


//searchCountry()
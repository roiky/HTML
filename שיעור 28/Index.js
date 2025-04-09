
console.log(data)

const popSum = data.reduce((populationSum, country) => {
    if(country.population){
        populationSum += country.population
    }
    return populationSum
},0)
console.log(popSum)
//==========================================================
const capitals = data.reduce((capitalsArr, country) => {
    if(country.capital){
        capitalsArr.push(...country.capital)
    }
    return capitalsArr
},[])
console.log(capitals)
//==========================================================
const languages = data.reduce((langsObj, country) => {
    if(country.languages && typeof country.languages === 'object'){
        langsObj = {...langsObj,...country.languages}
    }
    return langsObj
},{});

console.log(languages)
console.log(Object.keys(languages).length)

const languages2 = data.reduce((langsObj, country) => {
    if(country.languages){
        Object.values(country.languages).forEach(lang =>{
            if(!langsObj[lang]){
                langsObj[lang] = 1
            }
        })
    }
    return langsObj
},{});

console.log(languages2)
console.log(Object.keys(languages2).length)
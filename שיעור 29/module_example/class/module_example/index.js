const axios = require("axios"); //

async function getCountry() {
  const result = await axios.get("https://restcountries.com/v3.1/name/isr");
  console.log(result.data);
}

getCountry();

console.log("this module contains only one function");

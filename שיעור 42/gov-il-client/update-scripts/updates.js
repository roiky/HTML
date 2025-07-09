import axios from "axios";
import fs from "fs";
import path from "path";

const flightURL = "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=1";
const flightPath = "./src/types_def/flight.json";
const carURL = "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=5&q=5625265";
const carPath = "./src/types_def/car-example.json";

async function updateModel() {
    let getModel = await axios.get(flightURL);
    console.log(getModel?.data?.result?.records?.[0]);
    writeJsonToFile(getModel?.data?.result?.records?.[0], flightPath);

    getModel = await axios.get(carURL);
    console.log(getModel?.data?.result?.records?.[0]);
    writeJsonToFile(getModel?.data?.result?.records?.[0], carPath);
}

updateModel();

function writeJsonToFile(jsonData, filePath) {
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
        if (err) {
            console.error("Error writing JSON to file:", err);
        } else {
            console.log("JSON file was written successfully to", filePath);
        }
    });
}

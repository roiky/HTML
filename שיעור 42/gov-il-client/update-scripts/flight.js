import axios from "axios";
import fs from "fs";
import path from "path";

async function updateModel() {
    const getModel = await axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=1");
    console.log(getModel?.data?.result?.records?.[0]);
    writeJsonToFile(getModel?.data?.result?.records?.[0]);
}

updateModel();

function writeJsonToFile(jsonData) {
    const filePath = "./src/types_def/flight.json";
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
        if (err) {
            console.error("Error writing JSON to file:", err);
        } else {
            console.log("JSON file was written successfully to", filePath);
        }
    });
}

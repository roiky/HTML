import axios from "axios";
import fs from "fs";
async function updateModel() {
  const getModel = await axios.get(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=1"
  );
  console.log(getModel?.data?.result?.records?.[0]);
  // write to file
}

updateModel();

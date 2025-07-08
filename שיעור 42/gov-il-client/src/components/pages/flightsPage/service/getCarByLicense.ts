import axios from "axios";
import type { CarApiType, CarClientType } from "../../../../types_def/CarTypes";

const BASE_URL = "https://data.gov.il/api/3/action/datastore_search";
const RESOURCE_ID = "053cea08-09bc-40ec-8f7a-156f0677aff3";

export async function getCarByLicense(lp: string): Promise<CarClientType | null> {
    try {
        const url = `${BASE_URL}?resource_id=${RESOURCE_ID}&q=${lp}`;
        const response = await axios.get<{ result: { records: Array<CarApiType> } }>(url);
        const car = response.data?.result?.records[0];

        if (!car) return null;

        return {
            id: car._id,
            licensePlate: car.mispar_rechev,
            manufacturer: car.tozeret_nm,
            model: car.kinuy_mishari,
            gimur: car.ramat_gimur,
            year: car.shnat_yitzur,
            color: car.tzeva_rechev,
            fuel: car.sug_delek_nm,
            lastTest: car.mivchan_acharon_dt,
            testValidUntil: car.tokef_dt,
        };
    } catch (error) {
        console.log("Failed to fetch car data:", error);
        return null;
    }
}

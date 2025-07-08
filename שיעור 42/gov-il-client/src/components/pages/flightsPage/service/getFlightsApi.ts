import axios from "axios";
import type { FlightType } from "..";
const url = "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit";
export type FlightClient = {
    id: number;
    flightNumber: string;
    airlineCompany: string;
    status: string;
    destinationAlphaCode: string;
    destinationCountry: string;
    country: string;
};
export async function getFlightsApi(paginationLimit: number): Promise<Array<FlightClient>> {
    const result = await axios.get<{ result: { records: Array<FlightType> } }>(`${url}=${paginationLimit}`);
    const data = result?.data?.result?.records;
    return data.map((item) => {
        return {
            id: item._id,
            flightNumber: item.CHFLTN,
            airlineCompany: item.CHOPERD,
            status: item.CHLOC1,
            destinationAlphaCode: item.CHLOC1T,
            destinationCountry: item.CHSTOL,
            country: item.CHLOCCT,
        };
    });
}

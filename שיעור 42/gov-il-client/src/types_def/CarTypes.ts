import data from "./car-example.json";

export type CarApiType = typeof data;

export type CarClientType = {
    id: number;
    licensePlate: number;
    manufacturer: string;
    model: string;
    gimur: string;
    year: number;
    color: string;
    fuel: string;
    lastTest: string;
    testValidUntil: string;
};

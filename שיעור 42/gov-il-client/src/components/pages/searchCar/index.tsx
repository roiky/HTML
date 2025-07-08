import { useState } from "react";
import { getCarByLicense } from "../flightsPage/service/getCarByLicense";
import type { CarClientType } from "../../../types_def/CarTypes";

export default function CarsPage() {
    const [lpInput, setLpInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [carData, setCarData] = useState<CarClientType | null>(null);

    const handleSearch = async () => {
        if (lpInput.length < 7 || lpInput.length > 8) {
            setErrorMessage("Invalid license plate!");
            return;
        }
        console.log("Searching for:", lpInput);
        setErrorMessage("");
        try {
            const car = await getCarByLicense(lpInput);
            if (!car) {
                setErrorMessage("car not found!");
                setCarData(null);
                return;
            }
            setCarData(car);
            //console.log(car);
        } catch (error) {
            console.error("Failed to fetch car", error);
            setErrorMessage("Failed to fetch car data");
            setCarData(null);
        }
    };

    return (
        <>
            <div>
                <h1>Search Car Page</h1>
                <input type="text" placeholder="Enter license plate" onChange={(e) => setLpInput(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
                <span style={{ color: "red" }}>{errorMessage}</span>
            </div>

            {carData && (
                <div style={{ border: "1px solid white", marginTop: "1rem", padding: "1rem" }}>
                    <h3>Car Details</h3>
                    <p>
                        <strong>License Plate:</strong> {carData.licensePlate}
                    </p>
                    <p>
                        <strong>Manufacturer:</strong> {carData.manufacturer}
                    </p>
                    <p>
                        <strong>Model:</strong> {carData.model}
                    </p>
                    <p>
                        <strong>Gimur:</strong> {carData.gimur}
                    </p>
                    <p>
                        <strong>Year:</strong> {carData.year}
                    </p>
                    <p>
                        <strong>Color:</strong> {carData.color}
                    </p>
                    <p>
                        <strong>Fuel:</strong> {carData.fuel}
                    </p>
                    <p>
                        <strong>Last Test:</strong> {carData.lastTest}
                    </p>
                    <p>
                        <strong>Test Valid Until:</strong> {carData.testValidUntil}
                    </p>
                </div>
            )}
        </>
    );
}

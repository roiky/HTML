import axios from "axios";
import "./Cars.css";
import { useEffect, useState } from "react";

const URL = "http://localhost:2200";

export function Cars(): JSX.Element {
    const [isLoading, setIsSalesLoading] = useState<boolean>(false);
    const [cars, setCars] = useState<{
        name: string;
        type: string;
        price: string;
        image: string;
        // @ts-ignore
    }>([]);

    console.log("Render component...");

    useEffect(() => {
        getCars();
        return () => {};
    }, []);

    useEffect(() => {
        console.log(cars);
        return () => {};
    }, [cars]);

    async function getCars() {
        try {
            setIsSalesLoading(true);
            const result = await axios.get(`${URL}/cars`);
            setCars(result?.data?.data);
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setIsSalesLoading(false);
        }
    }

    return (
        <div className="Cars">
            <h2>Old Cars</h2>
            {isLoading ? <h2>Loading...</h2> : <div>{JSON.stringify(cars)}</div>}
        </div>
    );
}

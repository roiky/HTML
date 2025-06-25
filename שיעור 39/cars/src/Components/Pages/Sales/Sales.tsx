import { useEffect, useState } from "react";
import "./Sales.css";
import axios from "axios";

const URL = "http://localhost:2200";

export function Sales(): JSX.Element {
    const [isSalesLoading, setIsSalesLoading] = useState<boolean>(false);
    const [sales, setsales] = useState([]);
    const [currentMonth, setMonth] = useState("");

    useEffect(() => {
        getSales();
        return () => {};
    }, [currentMonth]);

    async function getSales() {
        try {
            setIsSalesLoading(true);
            const result = await axios.get(`${URL}/sales?input=${currentMonth}`);
            setsales(result?.data?.data);
            console.log(result?.data?.data);
        } catch (error) {
            console.error("Error fetching sales", error);
        } finally {
            setIsSalesLoading(false);
        }
    }

    return (
        <div className="Sales">
            <h2>Sales</h2>

            <button onClick={() => setMonth("")}>Get All Data</button>

            <button onClick={() => setMonth((new Date().getMonth() + 1).toString())}>Get This Month Data</button>

            <div>
                {isSalesLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 3,
                        }}
                    >
                        {sales?.map((c: { description: string; price: string; enDate: string }, index: number) => {
                            return (
                                <div key={index} style={{ border: "1px solid black" }}>
                                    <h2>{c.description}</h2>
                                    <h4>{c.price}</h4>
                                    <h4>{c.enDate}</h4>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

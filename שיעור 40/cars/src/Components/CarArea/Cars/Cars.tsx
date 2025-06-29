import axios from "axios";
import "./Cars.css";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
const URL = "http://localhost:2200";

type carType = { name: string; price: string; type: string };

console.log(debounce);
export function Cars(): JSX.Element {
    const [isCarsLoading, setIsCarsLoading] = useState<boolean>(false);
    const [cars, setCars] = useState([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isLatestResult, setIsLatestResult] = useState(false);

    function countTypes(cars: Array<carType>) {
        console.log("Calculation is running...");
        if (!Array.isArray(cars)) return;
        if (cars.length === 0) return 0;
        let stats: { [key: string]: number } = {};
        cars.forEach((s) => {
            if (stats[s.type]) {
                stats[s.type]++;
            } else {
                stats[s.type] = 1;
            }
        });
        return stats;
    }

    const memoizedTypes = useMemo(() => {
        return countTypes(cars);
    }, [cars]);

    // lifecycle
    // mounted

    useEffect(() => {
        getCars();
        return () => {
            console.log("canceling set state for", searchInput);
            setIsLatestResult(false);
        };
    }, [searchInput]);

    async function getCars() {
        try {
            setIsLatestResult(true);
            setIsCarsLoading(true);
            const result = await axios.get(`${URL}/cars?search=${searchInput}`);
            if (isLatestResult) {
                console.log("set state is working");
                setCars(result?.data?.data);
            }
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setIsCarsLoading(false);
        }
    }
    const debouncedSetSearch = useMemo(
        () =>
            debounce((value) => {
                setSearchInput(value);
            }, 500), // 500ms delay
        []
    );
    const handleChange = (event: any) => {
        debouncedSetSearch(event.target.value);
    };
    return (
        <div className="Cars">
            <h1>Cars</h1>
            <div>
                <input type="text" onChange={handleChange} placeholder="Search..." />
                {/* <input type="text" onChange={handleChange} /> */}
            </div>
            <div>
                {isCarsLoading ? (
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
                        {cars?.map((c: { name: string; price: string; type: string }) => {
                            return (
                                <div style={{ border: "1px solid black" }}>
                                    <h2>{c.name}</h2>
                                    <h2>{c.price}</h2>
                                    <h2>{c.type}</h2>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div style={{ marginTop: "20px" }}>
                    <h2>Summary by Type:</h2>
                    {memoizedTypes &&
                        Object.entries(memoizedTypes).map(([type, count]) => (
                            <p key={type}>
                                <strong>{type}</strong>: {count}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    );
}

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
const URL = "http://localhost:2200";

export function SalesStatistics(): JSX.Element {
    const [isSalesLoading, setIsSalesLoading] = useState<boolean>(false);
    const [inputState, setInputState] = useState<string>("");

    console.log("Do we have rendering?")
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sales, setSales] = useState<
        {
            description: string;
            price: string;
            endDate: string;
        }[]
    >([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newSale = {
            description,
            price: `$${price}`,
            endDate
        };

        setSales([...sales, newSale]);

        // Clear form inputs
        setDescription('');
        setPrice('');
        setEndDate('');
    };




    useEffect(() => {
        getSales();
        return () => { };
    }, []);

    async function getSales() {
        try {
            setIsSalesLoading(true);
            const result = await axios.get(`${URL}/sales`);
            setSales(result?.data?.data);
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setIsSalesLoading(false);
        }
    }

    function calcSalesAvg(sales: Array<{
        description: string;
        price: string;
        endDate: string;
    }>) {
        console.log("Calculation is running...")
        if (!Array.isArray(sales)) return;
        if (sales.length === 0) return 0;
        let sum = 0;
        sales.forEach(s => {
            sum += parseInt(s.price.replace("$", "").replaceAll(",", ""))
        })
        return (sum / sales.length).toFixed(2)
    }

    // const avg = calcSalesAvg(sales)
    const memoizedAvg = useMemo(() => { return calcSalesAvg(sales) }, [sales])
    return (
        <div >
            <h1> Statistics</h1>
            <div>
                <div>
                    <h2>Add Sale</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="text"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <button type="submit">Add Sale</button>
                    </form>



                </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
                <div>
                    <input onChange={(e) => {
                        setInputState(e.target.value)
                    }} type="text" placeholder="filter..." />
                    <span> Your new filter: {inputState} </span>
                    <div>
                        {sales.map(s => { return <div key={s.description}> {s.endDate}</div> })}
                    </div>
                </div>
                <div>
                    {isSalesLoading ? (
                        <div>
                            Loading..
                        </div>
                    ) : (
                        <div>${memoizedAvg}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

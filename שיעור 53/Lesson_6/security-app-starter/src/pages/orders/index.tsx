import { getAllOrders } from "../../services/orders.api";
import { useEffect, useState } from "react";

function formatDateInput(d: Date) {
    return d.toISOString().slice(0, 10);
}

export default function Orders() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllOrders({ from: "", to: "" });
            console.log(res);
            setItems(res);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <section className="card">
            <div className="card-header">
                <h2>Orders</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table" style={{ width: "100%" }}>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th>Order ID</th>
                                <th>Employee Name</th>
                                <th>Customer Name</th>
                                <th>Ship City</th>
                                <th>Shipping Fees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(items ?? []).map((it: any) => (
                                <tr style={{ textAlign: "center" }} key={it.id}>
                                    <td>{it.id}</td>
                                    <td>{it.employeeName}</td>
                                    <td>{it.customerName}</td>
                                    <td>{it.ship_city}</td>
                                    <td>{Number(it.shipping_fee).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
}

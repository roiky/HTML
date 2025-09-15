import { useEffect, useState } from "react";
import { createLecturer, fetchLecturers } from "../services/data";

function formatDateInput(d: Date) {
    return d.toISOString().slice(0, 10);
}

export default function Data() {
    const [from, setFrom] = useState(formatDateInput(new Date(new Date().setMonth(new Date().getMonth() - 2))));
    const [to, setTo] = useState(formatDateInput(new Date()));
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [categoriesCount, setCategoriesCount] = useState<Record<string, number>>({});

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchLecturers();
            setItems(res);
            console.log(res);

            const randMail = `test${Date.now()}@example.com`;
            const newLecturer = await createLecturer({
                first_name: "test",
                last_name: "last",
                age: 13,
                email: randMail,
                course_count: 4,
            });
            console.log(newLecturer);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        console.log("Categories Count Start");
        if (!items.length) return;

        const counts: Record<string, number> = {};

        items.forEach((it) => {
            const category = it.category ?? "Unknown-category";
            counts[category] = (counts[category] || 0) + 1;
        });

        setCategoriesCount(counts);
        console.log(categoriesCount);
    }, [items]);

    return (
        <section className="card">
            <div className="card-header">
                <h2>Data</h2>
                <div className="filters">
                    <label>
                        From <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                    </label>
                    <label>
                        To <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
                    </label>
                    <button className="btn" onClick={load} disabled={loading}>
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                </div>
            </div>
            {error && <div className="error">{error}</div>}

            <div className="summary">
                <h3>Categories Summary</h3>
                <ul>
                    {Object.entries(categoriesCount).map(([category, count]) => (
                        <li key={category}>
                            {category} - {count}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid">
                {items.map((it, idx) => {
                    //console.log(`[${it.id}] category: ${it.category}`);

                    return (
                        <div key={idx} className="tile">
                            <div className="tile-title">Session #{it.session ?? it.id ?? idx + 1}</div>
                            <div className="tile-body">
                                <div>
                                    <strong>Date:</strong> {it.date ?? it.createdAt ?? "-"}
                                </div>
                                <div>
                                    <strong>Category:</strong> {it.category ?? "-"}
                                </div>
                                <div>
                                    <strong>Amount:</strong> {it.amount ?? "-"}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {!loading && items.length === 0 && <p className="muted">No results for the selected range.</p>}
            </div>
        </section>
    );
}

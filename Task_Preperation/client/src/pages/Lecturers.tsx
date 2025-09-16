import { useEffect, useState } from "react";
import { createLecturer, fetchLecturers } from "../services/data";
import { Button } from "@mui/material";
import LecurerModal from "../components/LecturerModal";

function formatDateInput(d: Date) {
    return d.toISOString().slice(0, 10);
}

export default function Data() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchLecturers();
            setItems(res);
            console.log(res);
            // console.log(newLecturer);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const newLecturerTest = async () => {
        const randMail = `test${Date.now()}@example.com`;
        const newLecturer = await createLecturer({
            first_name: "test",
            last_name: "last",
            age: 13,
            email: randMail,
            course_count: 4,
        });
        const res = await fetchLecturers();
        setItems(res);
    };

    // Modal - START
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleSaveLecturer = async (data: {
        first_name: string;
        last_name: string;
        age: number;
        email: string;
        course_count: number;
    }) => {
        try {
            const newLecturer = await createLecturer({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                age: Number(data.age),
                course_count: Number(data.course_count),
            });
            console.log(data);
            console.log(`Created new lecturer, [ID = ${newLecturer.id}]`);
            const res = await fetchLecturers();
            setItems(res);
            await load();
        } catch (error) {
            console.log(`[ERROR - create lecturer failed] ${error}`);
        }
    };
    // Modal - END

    return (
        <section className="card">
            <div className="card-header">
                <h2>Lecturers Data</h2>
            </div>
            {error && <div className="error">{error}</div>}

            <div className="newLecturer">
                <Button size="small" variant="contained" onClick={handleOpenModal}>
                    Create New Lecturer
                </Button>
            </div>

            <div className="tableData">
                <table className="table" style={{ width: "100%" }}>
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>E-Mail</th>
                            <th>Course Count</th>
                            <th>n8n Knowledge</th>
                            <th>AI Knowledge</th>
                            <th>MySQL Knowledge</th>
                            <th>Fullstack Knowledge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(items ?? []).map((it: any) => (
                            <tr style={{ textAlign: "center" }} key={it.id}>
                                <td>{it.id}</td>
                                <td>
                                    {it.first_name} {it.last_name}
                                </td>
                                <td>{it.age}</td>
                                <td>{it.email}</td>
                                <td>{Number(it.course_count).toFixed(2)}</td>
                                <td>{it.n8n_level}</td>
                                <td>{it.ai_level}</td>
                                <td>{it.mysql_level}</td>
                                <td>{it.fullstack_level}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <LecurerModal open={modalOpen} onClose={handleCloseModal} onSave={handleSaveLecturer} />
        </section>
    );
}

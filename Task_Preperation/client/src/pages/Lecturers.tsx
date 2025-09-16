import { useEffect, useState } from "react";
import {
    createLecturer,
    fetchLecturers,
    updateKnowledge,
    fetchLevels,
    KnowledgeLevel,
    DomainLabel,
    deleteLecturer,
} from "../services/data";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import LecurerModal from "../components/LecturerModal";

const DOMAIN_TO_FIELD: Record<DomainLabel, keyof any> = {
    n8n: "n8n_level",
    "AI Tools": "ai_level",
    MySQL: "mysql_level",
    "Full Stack Dev": "fullstack_level",
};

export default function Data() {
    const [levels, setLevels] = useState<KnowledgeLevel[]>([]);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<Record<string, boolean>>({});

    async function load() {
        setLoading(true);
        setError(null);
        try {
            // טען במקביל
            const [lvls, rows] = await Promise.all([fetchLevels(), fetchLecturers()]);
            setLevels(lvls);
            setItems(rows);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function handleLevelChange(rowId: number, domain: DomainLabel, newLevel: KnowledgeLevel) {
        const field = DOMAIN_TO_FIELD[domain];
        const key = `${rowId}:${String(field)}`;
        const prev = items.find((x) => x.id === rowId);
        if (!prev) return;
        const prevLevel = prev[field];

        // Optimistic UI
        setItems((cur) => cur.map((r) => (r.id === rowId ? { ...r, [field]: newLevel } : r)));
        setSaving((cur) => ({ ...cur, [key]: true }));
        try {
            await updateKnowledge(rowId, domain, newLevel);
        } catch (err: any) {
            // revert
            setItems((cur) => cur.map((r) => (r.id === rowId ? { ...r, [field]: prevLevel } : r)));
            alert(err?.response?.data?.message || "Failed to save knowledge level!");
        } finally {
            setSaving((cur) => {
                const copy = { ...cur };
                delete copy[key];
                return copy;
            });
        }
    }

    function KnowledgeSelect({
        value,
        options,
        onChange,
        disabled,
        saving,
    }: {
        value: KnowledgeLevel;
        options: KnowledgeLevel[]; // מגיע מהשרת
        onChange: (v: KnowledgeLevel) => void;
        disabled?: boolean;
        saving?: boolean;
    }) {
        return (
            <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                <select value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
                    {options.map((lvl) => (
                        <option key={lvl} value={lvl}>
                            {lvl}
                        </option>
                    ))}
                </select>
                {saving ? <span title="Saving…">⏳</span> : null}
            </div>
        );
    }

    // Modal - START
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    async function handleDeleteLecturer(id: number) {
        if (!id) return;

        try {
            setLoading(true);
            await deleteLecturer(id);
            await load();
        } catch (e: any) {
            setError(e?.message ?? "Failed to load");
        } finally {
            setLoading(false);
        }
    }

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
            // const res = await fetchLecturers();
            // setItems(res);
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
                            <th>Email</th>
                            <th>Course Count</th>
                            <th>n8n Knowledge</th>
                            <th>AI Knowledge</th>
                            <th>MySQL Knowledge</th>
                            <th>Fullstack Knowledge</th>
                            <th></th>
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
                                <td>
                                    <KnowledgeSelect
                                        value={it.n8n_level}
                                        options={levels}
                                        disabled={!!saving[`${it.id}:n8n_level`]}
                                        saving={!!saving[`${it.id}:n8n_level`]}
                                        onChange={(val) => handleLevelChange(it.id, "n8n", val)}
                                    />
                                </td>
                                <td>
                                    <KnowledgeSelect
                                        value={it.ai_level}
                                        options={levels}
                                        disabled={!!saving[`${it.id}:ai_level`]}
                                        saving={!!saving[`${it.id}:ai_level`]}
                                        onChange={(val) => handleLevelChange(it.id, "AI Tools", val)}
                                    />
                                </td>
                                <td>
                                    <KnowledgeSelect
                                        value={it.mysql_level}
                                        options={levels}
                                        disabled={!!saving[`${it.id}:mysql_level`]}
                                        saving={!!saving[`${it.id}:mysql_level`]}
                                        onChange={(val) => handleLevelChange(it.id, "MySQL", val)}
                                    />
                                </td>
                                <td>
                                    <KnowledgeSelect
                                        value={it.fullstack_level}
                                        options={levels}
                                        disabled={!!saving[`${it.id}:fullstack_level`]}
                                        saving={!!saving[`${it.id}:fullstack_level`]}
                                        onChange={(val) => handleLevelChange(it.id, "Full Stack Dev", val)}
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            handleDeleteLecturer(it.id);
                                        }}
                                    >
                                        {/* Delete */}
                                        <DeleteIcon fontSize="small" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <LecurerModal open={modalOpen} onClose={handleCloseModal} onSave={handleSaveLecturer} />
        </section>
    );
}

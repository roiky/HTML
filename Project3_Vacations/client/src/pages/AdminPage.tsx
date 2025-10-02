// src/pages/AdminVacationsPage.tsx
import React, { useEffect, useState } from "react";
import VacationCard, { VacationRow } from "../components/VacationCard";
import VacationFormModal from "../components/VacationFormModal";
import { fetchVacations } from "../services/vacations.service"; // משתמשים בפונקציה קיימת
import { createVacationAdmin, updateVacationAdmin, deleteVacationAdmin } from "../services/vacations.admin.service";
import { useAuth } from "../contex/AuthContext";

export default function AdminVacationsPage() {
    const { user } = useAuth();
    const userId = user?.userId ?? null;

    // only admins should mount this page (you can still protect route-level)
    if (user?.role !== "admin") return <div>Not allowed</div>;

    const [rows, setRows] = useState<VacationRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editing, setEditing] = useState<VacationRow | null>(null);

    async function load() {
        setLoading(true);
        try {
            const resp = await fetchVacations({ filter: "all", userId: userId, page: 1 });
            setRows(resp?.data ?? []);
        } catch (err) {
            console.error("Load failed", err);
            setRows([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    function openAdd() {
        setEditing(null);
        setModalMode("add");
        setModalOpen(true);
    }

    function openEdit(item: VacationRow) {
        setEditing(item);
        setModalMode("edit");
        setModalOpen(true);
    }

    async function handleSave(payload: {
        destination: string;
        description: string;
        start_date: string;
        end_date: string;
        price: number;
        image?: File | null;
    }) {
        if (modalMode === "add") {
            await createVacationAdmin(payload);
        } else if (modalMode === "edit" && editing) {
            await updateVacationAdmin(editing.vacation_id, payload);
        }
        await load();
    }

    async function handleDelete(id: number) {
        const ok = window.confirm("Are you sure you want to delete this vacation?");
        if (!ok) return;
        await deleteVacationAdmin(id);
        await load();
    }

    return (
        <section style={{ padding: 18 }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h2>Admin - Vacations</h2>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={openAdd}>Add Vacation</button>
                </div>
            </header>

            {loading ? <div>Loading...</div> : null}

            <div style={{ display: "grid", gap: 12 }}>
                {rows.map((r) => (
                    <div key={r.vacation_id} style={{ position: "relative" }}>
                        <VacationCard
                            item={r}
                            onEdit={() => openEdit(r)}
                            onDelete={() => handleDelete(r.vacation_id)}
                            // We don't need follow button here; VacationCard shows it if onToggleFollow provided
                            // We omit onToggleFollow to hide follow in admin view OR you can pass it if you want
                        />
                    </div>
                ))}
            </div>

            <VacationFormModal
                open={modalOpen}
                initial={
                    editing
                        ? {
                              destination: editing.destination,
                              description: editing.description,
                              start_date: editing.start_date,
                              end_date: editing.end_date,
                              price: editing.price,
                              image_name: editing.image_name ?? null,
                          }
                        : null
                }
                mode={modalMode}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
            />
        </section>
    );
}

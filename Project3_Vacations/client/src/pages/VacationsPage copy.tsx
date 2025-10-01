// src/pages/VacationsPage.tsx
import React, { useEffect, useState } from "react";
import VacationCard, { VacationRow } from "../components/VacationCard";
import { fetchVacations, followVacation, unfollowVacation } from "../services/vacations.service";
import { useAuth } from "../contex/AuthContext";

export default function VacationsPage() {
    const { user } = useAuth();
    const userId = user?.userId ?? null;

    const [rows, setRows] = useState<VacationRow[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<Record<number, boolean>>({});

    const [filter, setFilter] = useState<"all" | "upcoming" | "active" | "followed">("active");

    async function load() {
        setLoading(true);
        try {
            // fetchVacations should return: { data: VacationRow[], meta: { total, page, pageSize } }
            const resp = await fetchVacations({ page, pageSize, filter, userId });
            const data = resp?.data ?? [];
            const meta = resp?.meta ?? { total: 0, page: page, pageSize };

            setRows(data);
            setTotal(Number(meta.total ?? 0));
            setPage(Number(meta.page ?? page));
            setPageSize(Number(meta.pageSize ?? pageSize));
        } catch (err) {
            console.error("Failed to load vacations", err);
            setRows([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, filter, userId]);

    async function handleToggleFollow(vacationId: number, currentlyFollowing: boolean) {
        if (!userId) {
            alert("You must be logged in to follow vacations.");
            return;
        }

        // optimistic update
        setRows((cur) =>
            cur.map((r) =>
                r.vacation_id === vacationId
                    ? {
                          ...r,
                          is_following: currentlyFollowing ? 0 : 1,
                          followers_count: currentlyFollowing ? r.followers_count - 1 : r.followers_count + 1,
                      }
                    : r
            )
        );

        setSaving((s) => ({ ...s, [vacationId]: true }));
        try {
            if (currentlyFollowing) {
                await unfollowVacation(userId, vacationId);
            } else {
                await followVacation(userId, vacationId);
            }
            // אופציונלי: ניתן לקרוא load() כדי לסנכרן מדויק מול השרת
        } catch (err) {
            // revert on error
            setRows((cur) =>
                cur.map((r) =>
                    r.vacation_id === vacationId
                        ? {
                              ...r,
                              is_following: currentlyFollowing ? 1 : 0,
                              followers_count: currentlyFollowing ? r.followers_count + 1 : r.followers_count - 1,
                          }
                        : r
                )
            );
            alert("Action failed, please try again.");
        } finally {
            setSaving((s) => {
                const copy = { ...s };
                delete copy[vacationId];
                return copy;
            });
        }
    }

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <section style={{ padding: 18 }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h2>Vacations</h2>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <select
                        value={filter}
                        onChange={(e) => {
                            setPage(1);
                            setFilter(e.target.value as any);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="active">Active</option>
                        <option value="followed">Followed</option>
                    </select>

                    <div style={{ alignSelf: "center", color: "#666" }}>{loading ? "Loading..." : `${total} items`}</div>
                </div>
            </header>

            <div style={{ display: "grid", gap: 12 }}>
                {rows.map((r) => (
                    <VacationCard
                        key={r.vacation_id}
                        item={r}
                        loading={!!saving[r.vacation_id]}
                        onToggleFollow={handleToggleFollow}
                        // אם יש לך onEdit/onDelete (admin): העבר פה
                    />
                ))}
            </div>

            <footer style={{ display: "flex", justifyContent: "space-between", marginTop: 16, alignItems: "center" }}>
                <div>
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                        Prev
                    </button>
                    <span style={{ margin: "0 8px" }}>
                        {page} / {totalPages}
                    </span>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                        Next
                    </button>
                </div>

                <div style={{ color: "#666" }}>Page size: {pageSize}</div>
            </footer>
        </section>
    );
}

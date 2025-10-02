import api from "./api";

export async function getCSV() {
    try {
        const resp = await api.get("/reports/csv", { responseType: "blob" });

        const blob = new Blob([resp.data], { type: "text/csv;charset=utf-8;" });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        a.download = "followers_report.csv";

        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
    } catch (err: any) {
        console.error("Failed to download CSV:", err);
        if (err?.response?.data) {
            try {
                const text = await err.response.data.text?.();
                console.warn("Server response (text):", text);
            } catch (_) {}
        }
        alert("Failed to download CSV — check console for details.");
    }
}

export async function fetchFollowedVacationIds(): Promise<number[]> {
    const { data } = await api.get("/vac/followed");
    const rows = data?.data ?? [];
    return rows.map((r: any) => Number(r.vacation_id));
}

export async function followVacation(userId: number, vacationId: number) {
    await api.post(`/vac/${vacationId}/follow`, { userId });
}

export async function unfollowVacation(userId: number, vacationId: number) {
    await api.delete(`/vac/${vacationId}/follow`, { data: { userId } });
}

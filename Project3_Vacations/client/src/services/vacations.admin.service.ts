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

export type CreateVacationPayload = {
    destination: string;
    description: string;
    start_date: string; // ISO or "YYYY-MM-DDTHH:mm" string
    end_date: string;
    price: number | string;
    image?: File | null;
};

export async function createVacationAdmin(payload: CreateVacationPayload) {
    const fd = new FormData();
    fd.append("destination", payload.destination);
    fd.append("description", payload.description);
    fd.append("start_date", payload.start_date);
    fd.append("end_date", payload.end_date);
    fd.append("price", String(payload.price));
    if (payload.image) fd.append("image", payload.image);

    // שים לב: api מגדיר baseURL ו־Authorization interceptor
    const { data } = await api.post("/admin/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

export async function updateVacationAdmin(id: number, payload: CreateVacationPayload) {
    const fd = new FormData();
    fd.append("destination", payload.destination);
    fd.append("description", payload.description);
    fd.append("start_date", payload.start_date);
    fd.append("end_date", payload.end_date);
    fd.append("price", String(payload.price));
    // image - אם קיים שולחים, אחרת לא שולחים כך השרת ישאיר את הישן
    if (payload.image) fd.append("image", payload.image);

    const { data } = await api.put(`/admin/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

export async function deleteVacationAdmin(id: number) {
    const { data } = await api.delete(`/admin/${id}`);
    return data;
}

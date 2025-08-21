import api from "./api";

interface DateQuery {
    from: string;
    to: string;
}
const base_url = "http://localhost:3000";
// Example service matching your earlier pattern:
// GET /dates?from=YYYY-MM-DD&to=YYYY-MM-DD  with Authorization header
export async function fetchDates({ from, to }: DateQuery) {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token);

    const response = await api.get(base_url + "/api/expenses/dates", {
        params: { from, to },
        headers: {
            Authorization: token,
        },
    });

    const rows = response.data?.data ?? []; //if "response.data.data" is missing return empty array

    return rows;
}

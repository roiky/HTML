import api from "./api";

export type FetchArgs = { page?: number; pageSize?: number; filter?: string; userId?: number | null };

export async function fetchVacations({ page = 1, pageSize = 10, filter = "all", userId = null }: FetchArgs) {
    const { data } = await api.get(`/vac/${filter}`, { params: { page, pageSize, filter, userId } });
    return data;
}

export async function followVacation(userId: number, vacationId: number) {
    await api.post(`/followers/${vacationId}`, { userId });
}

export async function unfollowVacation(userId: number, vacationId: number) {
    await api.delete(`/followers/${vacationId}`, { data: { userId } });
}

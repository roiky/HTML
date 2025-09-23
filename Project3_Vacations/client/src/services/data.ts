import api from "./api";

const base_url = "http://localhost:3000";

export async function fetchLecturers() {
    const response = await api.get(base_url + "/lecturers", {
        params: {},
        headers: {},
    });

    const rows = response.data?.data ?? []; //if "response.data.data" is missing return empty array

    return rows;
}

interface NewLecturer {
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    course_count: number;
}
export async function createLecturer({ first_name, last_name, email, age, course_count }: NewLecturer) {
    const response = await api.post(base_url + "/lecturers/addLecturer", {
        first_name,
        last_name,
        email,
        age,
        course_count,
    });

    const rows = response.data ?? [];

    return rows;
}

export type DomainLabel = "n8n" | "AI Tools" | "MySQL" | "Full Stack Dev";
export type KnowledgeLevel = string;

export async function fetchLevels(): Promise<KnowledgeLevel[]> {
    const { data } = await api.get("/lecturers/levels");
    return data?.data ?? []; // ["No knowledge","Low","Medium","Expert"]
}

export async function updateKnowledge(id: number, domain: DomainLabel, level: KnowledgeLevel) {
    await api.put(base_url + `/lecturers/${id}/knowledge`, { domain, level });
}

export async function deleteLecturer(id: number) {
    const response = await api.delete(base_url + `/lecturers/remove/${id}`, {});

    const rows = response.data ?? [];

    return rows;
}

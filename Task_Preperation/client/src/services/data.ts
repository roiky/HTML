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

import axios from "axios";

const url = "http://localhost:2200/user-details";

export type UserClient = {
    username: string;
    permissions: {
        flights?: string[];
        cars?: string[];
    };
};

export async function getUsersApi(): Promise<UserClient> {
    const result = await axios.get<UserClient>(url);
    return result.data;
}

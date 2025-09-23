import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    timeout: 20000,
});

api.interceptors.response.use(
    (r) => r,
    (error) => {
        // Normalize common error message
        const msg = error?.response?.data?.message || error?.message || "Request failed";
        return Promise.reject(new Error(msg));
    }
);

export default api;

import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token automatically
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const registerUser = (userData) => {
    return API.post("/register", userData);
};

export const loginUser = (userData) => {
    return API.post("/login", userData);
};

export default API;
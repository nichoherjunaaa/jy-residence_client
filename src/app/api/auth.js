import apiClient from "./apiClient";

export const login = async (email, password) => {
    try {
        const { data } = await apiClient.post("/users/login", { email, password });
        return data;
    } catch (error) {
        const message = error.response?.data || "Login failed";
        throw new Error(message);
    }
};
export const register = async (userData) => {
    try {
        const { data } = await apiClient.post(`/users/register`, userData);
        return data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed. Please try again.";
    }
};

export const getCurrentUser = async () => {
    try {
        const { data } = await apiClient.get("/users/me");
        return data.user || data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};
import apiClient from "./apiClient";

export const createBooking = async (bookingData) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
        throw new Error("Sesi berakhir, silakan login kembali.");
    }
    const response = await apiClient.post("/bookings", bookingData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getBookings = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
        throw new Error("Sesi berakhir, silakan login kembali.");
    }
    const response = await apiClient.get("/bookings/my-bookings", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
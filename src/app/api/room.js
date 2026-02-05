import apiClient from "./apiClient";

export const getRooms = async (limit = null) => {
    const url = limit ? `/rooms?limit=${limit}` : "/rooms";
    const response = await apiClient.get(url);
    return response.data;
};

export const getRoomById = async (id) => {
    const response = await apiClient.get(`/rooms/${id}`);
    return response.data;
}
import apiClient from "./apiClient";

export const snapQris = async (paymentData) => {    
    try {
        const response = await apiClient.post('/charge-qris', paymentData, {
            headers: {
                Authorization: `Bearer ${paymentData.token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating QRIS transaction:", error);
        throw error;
    }
}

export const getPaymentStatus = async (orderId, token) => {
    try {
        const response = await apiClient.get(`/status/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting payment status:", error);
        throw error;
    }
}
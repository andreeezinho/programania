import api from "../api";

export const register = async (data) => {
    try {
        const response = await api.post('/users', data);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}
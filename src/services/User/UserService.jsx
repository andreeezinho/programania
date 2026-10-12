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

export const update = async (data, uuid) => {
    try {
        const response = await api.put(`/users/${uuid}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePassword = async (data, uuid) => {
    try {
        const response = await api.put(`/users/${uuid}/password`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}
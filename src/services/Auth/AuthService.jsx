import api from "../api";

export const auth = async (credentials) => {
    try {
        const response = await api.post('/auth', credentials);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUser = async () => {
    try {
        const response = await api.get('/me',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }); 

        return response.data;
    } catch (error) {
        throw error;
    }
}
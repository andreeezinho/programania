import api from "../api";

export const getFase = async (params) => {
    try{
        console.log(params);
        const response = await api.get('/phases', {
            params: params,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    }catch(error){
        console.log("Erro ao buscar fases: ", error);
        throw error;
    }
};

export const getFaseByUuid = async (uuid) => {
    try{
        const response = await api.get(`/phases/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    }catch(error){
        console.log("Erro ao buscar fase: ", error);
        throw error;
    }
};
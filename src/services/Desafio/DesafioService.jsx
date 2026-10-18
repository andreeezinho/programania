import api from "../api";

export const getDesafiosFromFase = async (faseUuid) => {
    try{
        const response = await api.get(`/desafios/fase/${faseUuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    }catch(error){
        console.log("Erro ao buscar desafios da fase: ", error);
        throw error;
    }
};

export const getBlocosFromDesafio = async (desafioUuid) => {
    try{
        const response = await api.get(`/desafio-bloco/blocos/${desafioUuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    }catch(error){
        console.log("Erro ao buscar blocos do desafio: ", error);
        throw error;
    }
};
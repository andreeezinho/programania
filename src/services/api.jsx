import axios from "axios";
import url from './url';

const BASE_URL = url;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

console.log("API base URL:", BASE_URL);

export default api;
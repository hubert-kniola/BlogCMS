import axios, { HttpStatusCode } from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://51.124.85.170'
    
});

axiosConfig.defaults.headers.common["content-type"]= "application/json";
axiosConfig.defaults.headers.common["accept"]= "*/*";

export default axiosConfig;
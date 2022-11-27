import axios, { HttpStatusCode } from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://generalauthapi.azurewebsites.net'
});

axiosConfig.defaults.headers.common["content-type"]= "application/json";
axiosConfig.defaults.headers.common["accept"]= "*/*";

export default axiosConfig;
import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://20.238.228.10'
});

axiosConfig.defaults.headers.common["content-type"]= "application/json";
axiosConfig.defaults.headers.common["accept"]= "*/*";


export default axiosConfig;
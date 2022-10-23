import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://pp-sdi-api.herokuapp.com/api/v1'
});

axiosConfig.defaults.headers.common["content-type"]= "application/json";
axiosConfig.defaults.headers.common["accept"]= "*/*";


export default axiosConfig;
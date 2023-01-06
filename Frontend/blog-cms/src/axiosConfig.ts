import axios, { HttpStatusCode } from "axios";
import { AuthURL } from "./settings";

const axiosConfig = axios.create({
  baseURL: AuthURL,
});

axiosConfig.defaults.headers.common["content-type"] = "application/json";
axiosConfig.defaults.headers.common["accept"] = "*/*";

export default axiosConfig;

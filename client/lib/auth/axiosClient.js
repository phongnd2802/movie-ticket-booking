// lib/axiosClient.js
import axios from "axios";
import { getRefreshToken } from "./token";
import { setCookie } from "../cookie";
// {
//   headers: {
//     "Content-Type": "application/json",
//   },
// }
const axiosClient = axios.create();

axiosClient.interceptors.request.use(async (config) => {
  const token = await getRefreshToken();
  if (token) {
    setCookie("at", token.at, 60 * 15);
    setCookie("rt", token.rt, 24 * 60 * 60 * 7);
    config.headers.Authorization = `Bearer ${token.at}`;
  }

  return config;
});

export default axiosClient;

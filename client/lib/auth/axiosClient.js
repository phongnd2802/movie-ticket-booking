// lib/axiosClient.js
import axios from "axios";
import { getRefreshToken } from "./token";
import { setCookie } from "../cookie";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const { at, rt } = await getRefreshToken();
  if (at && rt && at !== "null" && rt !== "null") {
    setCookie("at", at, 60 * 15);
    setCookie("rt", rt, 24 * 60 * 60 * 7);
    config.headers.Authorization = `Bearer ${at}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosClient;

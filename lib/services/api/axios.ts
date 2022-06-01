import axios from "axios";
import { getAuthToken } from "../storage/authToken";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: { "Access-Control-Allow-Origin": "true" },
});

axiosInstance.interceptors.request.use((config) => {
  const authToken = getAuthToken();

  if (config.headers === undefined) config.headers = {};

  if (authToken) config.headers.authorization = `Bearer ${authToken}`;

  return config;
});

export { axiosInstance };

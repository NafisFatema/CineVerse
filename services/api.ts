import axios from "axios";

const BASE_URL = "http://192.168.0.198:4000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

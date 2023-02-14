import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://store.sagitanirus.com/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;

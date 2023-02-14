import apiClient from "../services/api";

export default {
  setHeader() {
    const token = localStorage.getItem("token");
    if (token)
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  async register(data) {
    return await apiClient.post(`register`, data);
  },
  async login(data) {
    return await apiClient.post(`login`, data);
  },
  async logout() {
    return await apiClient.post(`logout`);
  },
};

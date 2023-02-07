import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://api.sagitanirus.com/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default {
  setHeader() {
    const token = localStorage.getItem("token");
    if (token)
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  async getUsers(query) {
    return await apiClient.get(`users?${query}`);
  },
  async getUser(id) {
    return await apiClient.get(`users/${id}`);
  },
  async createUser(data) {
    return await apiClient.post(`users`, data);
  },
  async updateUser(data) {
    return await apiClient.put(`users/${data.id}`, data);
  },
  async deleteUser(id) {
    await apiClient.delete(`users/${id}`);
  },
  async register(data) {
    return await apiClient.post(`register`, data);
  },
  async login(data) {
    return await apiClient.post(`login`, data);
  },
  async logout() {
    return await apiClient.post(`logout`)
  }
};

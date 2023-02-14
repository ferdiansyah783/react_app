import apiClient from "../services/api";

export default {
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
};

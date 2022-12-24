import axios from "axios";

const apiClient = axios.create({
    baseURL: `https://rbthemes.com/api`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export const getUsers = async (query) => {
    return await apiClient.get(`users?${query}`);
}

export const getUser = async (id) => {
    return await apiClient.get(`users/${id}`)
}

export const createUser = async (data) => {
    return await apiClient.post(`users`, data);
}

export const updateUser = async (data) => {
    return await apiClient.put(`users/${data.id}`, data);
}

export const deleteUser = async (id) => {
    await apiClient.delete(`users/${id}`);
}
import axios from "axios";

const apiClient = axios.create({
    baseURL: `http://localhost:3001`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export const getAllUsers = async () => {
    const users = await apiClient.get(`users`);
    return users;
}

export const getUser = async (id) => {
    const user =  await apiClient.get(`users/${id}`)
    return user
}

export const searchUser = async (query) => {
    const user = await apiClient.get(`users?name_like&username_like=${query}`)
    return user
}

export const sortUser = async (query) => {
    const user = await apiClient.get(`users?_sort=${query}&_order=asc`)
    return user
}

export const createUser = async (data) => {
    const user = await apiClient.post(`users`, data);
    return user
}

export const updateUser = async (data) => {
    const user = await apiClient.put(`users/${data.id}`, data);
    return user
}

export const deleteUser = async (id) => {
    await apiClient.delete(`users/${id}`);
}
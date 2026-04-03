import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const authHeader = { headers: { Authorization: `Bearer ${token}` } };

export const getCategoriesFlat = async () => {
    const res = await axios.get(`${apiUrl}/api/category/categories-flat`, authHeader);
    return res.data;
}

export const getCategoriesTree = async () => {
    const res = await axios.get(`${apiUrl}/api/category/categories-tree`);
    return res.data;
}

export const createCategory = async (form) => {
    return await axios.post(`${apiUrl}/api/category`, form, authHeader);
}

export const deleteCategoryById = async (id) => {
    return await axios.delete(`${apiUrl}/api/category/${id}`, authHeader);
}
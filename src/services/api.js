import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const getProducts = async (limit = 10, skip = 0) => {
  const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/products/search?q=${query}`);
  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const addProductApi = async (productData) => {
  const response = await axios.post(`${API_BASE_URL}/products/add`, productData);
  return response.data;
};
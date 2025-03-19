import axios from "axios";

const API_URL = "http://localhost:5000";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const getInventory = async (token) => {
  const response = await axios.get(`${API_URL}/inventory`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addInventory = async (token, item) => {
  const response = await axios.post(`${API_URL}/inventory`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteInventory = async (token, id) => {
  const response = await axios.delete(`${API_URL}/inventory/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

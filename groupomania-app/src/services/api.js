import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};

export { getUsers, createUser, deleteUser };

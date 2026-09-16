import axiosClient from './axiosClient';

export const login = async (email, password) => {
  const response = await axiosClient.post('/users/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosClient.post('/users/register', userData);
  return response.data;
};

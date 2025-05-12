import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust to your Flask backend

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const register = async (data: { email: string; password: string; name: string }) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};

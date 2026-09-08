import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const login_user = (data) => axios.post(`${API_URL}/login`, data);

export const logout_user = () => axios.post(`${API_URL}/logout`);

export const checkAuth_user_service = () => axios.get(`${API_URL}/checkUser`);

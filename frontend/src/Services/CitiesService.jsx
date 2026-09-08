import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/cities`;

// GET ALL
export const get_cities_service = () => axios.get(API_URL);

// GET BY ID
export const get_city_by_id_service = (id) => axios.get(`${API_URL}/${id}`);

// GET BY SLUG
export const get_city_by_slug_service = (slug) => axios.get(`${API_URL}/slug/${slug}`);

// CREATE
export const create_city_service = (data) => axios.post(API_URL, data);

// UPDATE
export const update_city_service = (id, data) => axios.put(`${API_URL}/${id}`, data);

// DELETE
export const delete_city_service = (id) => axios.delete(`${API_URL}/${id}`);

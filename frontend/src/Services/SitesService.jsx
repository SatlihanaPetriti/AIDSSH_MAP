import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/sites`;

// GET ALL
export const get_sites_service = () => axios.get(API_URL);

// GET BY ID
export const get_site_by_id_service = (id) => axios.get(`${API_URL}/${id}`);

// CREATE
export const create_site_service = (data) => axios.post(API_URL, data);

// UPDATE
export const update_site_service = (id, data) => axios.put(`${API_URL}/${id}`, data);

// DELETE
export const delete_site_service = (id) => axios.delete(`${API_URL}/${id}`);

import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/eras`;

// GET ALL (optionally filtered by city)
export const get_eras_service = (cityId) =>
    axios.get(API_URL, { params: cityId ? { cityId } : {} });

// GET BY ID
export const get_era_by_id_service = (id) => axios.get(`${API_URL}/${id}`);

// CREATE
export const create_era_service = (data) => axios.post(API_URL, data);

// UPDATE
export const update_era_service = (id, data) => axios.put(`${API_URL}/${id}`, data);

// DELETE
export const delete_era_service = (id) => axios.delete(`${API_URL}/${id}`);

import { createContext, useContext, useState, useEffect } from "react";
import {
    get_cities_service,
    get_city_by_slug_service,
    create_city_service,
    update_city_service,
    delete_city_service,
} from "../Services/CitiesService";

// Context global
const CitiesContext = createContext({});

// Provider
const CitiesProvider = (props) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllCities();
    }, []);

    // GET ALL
    const getAllCities = async () => {
        setLoading(true);
        try {
            const result = await get_cities_service();
            if (result.status === 200) {
                setCities(result.data);
            }
        } catch (error) {
            setError("Failed to load cities");
        } finally {
            setLoading(false);
        }
    };

    // GET BY SLUG
    const getCityBySlug = async (slug) => {
        try {
            const result = await get_city_by_slug_service(slug);
            return result.data;
        } catch (error) {
            setError("Failed to get city");
            return null;
        }
    };

    // CREATE
    const createCity = async (data) => {
        setLoading(true);
        try {
            const result = await create_city_service(data);
            await getAllCities();
            return result;
        } catch (error) {
            setError("Failed to create city");
        } finally {
            setLoading(false);
        }
    };

    // UPDATE
    const updateCity = async (id, data) => {
        setLoading(true);
        try {
            const result = await update_city_service(id, data);
            await getAllCities();
            return result;
        } catch (error) {
            setError("Failed to update city");
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const deleteCity = async (id) => {
        setLoading(true);
        try {
            const result = await delete_city_service(id);
            await getAllCities();
            return result;
        } catch (error) {
            setError("Failed to delete city");
        } finally {
            setLoading(false);
        }
    };

    const values = {
        cities,
        loading,
        error,
        getAllCities,
        getCityBySlug,
        createCity,
        updateCity,
        deleteCity,
    };

    return (
        <CitiesContext.Provider value={values}>
            {props.children}
        </CitiesContext.Provider>
    );
};

const useCitiesContext = () => useContext(CitiesContext);

export { CitiesProvider, useCitiesContext };

import { createContext, useContext, useState, useEffect } from "react";
import {
    get_sites_service,
    create_site_service,
    update_site_service,
    delete_site_service,
} from "../Services/SitesService";

// Context global
const SitesContext = createContext({});

// Provider
const SitesProvider = (props) => {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllSites();
    }, []);

    // GET ALL
    const getAllSites = async () => {
        setLoading(true);
        try {
            const result = await get_sites_service();
            if (result.status === 200) {
                setSites(result.data);
            }
        } catch (error) {
            setError("Failed to load sites");
        } finally {
            setLoading(false);
        }
    };

    // CREATE
    const createSite = async (data) => {
        setLoading(true);
        try {
            const result = await create_site_service(data);
            await getAllSites();
            return result;
        } catch (error) {
            setError("Failed to create site");
        } finally {
            setLoading(false);
        }
    };

    // UPDATE
    const updateSite = async (id, data) => {
        setLoading(true);
        try {
            const result = await update_site_service(id, data);
            await getAllSites();
            return result;
        } catch (error) {
            setError("Failed to update site");
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const deleteSite = async (id) => {
        setLoading(true);
        try {
            const result = await delete_site_service(id);
            await getAllSites();
            return result;
        } catch (error) {
            setError("Failed to delete site");
        } finally {
            setLoading(false);
        }
    };

    const values = { sites, loading, error, getAllSites, createSite, updateSite, deleteSite };

    return (
        <SitesContext.Provider value={values}>
            {props.children}
        </SitesContext.Provider>
    );
};

const useSitesContext = () => useContext(SitesContext);

export { SitesProvider, useSitesContext };

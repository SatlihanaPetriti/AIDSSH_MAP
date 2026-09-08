import { createContext, useContext, useState, useEffect } from "react";
import {
    get_execution_sites_service,
    create_execution_site_service,
    update_execution_site_service,
    delete_execution_site_service,
} from "../Services/ExecutionSitesService";

// Context global
const ExecutionSitesContext = createContext({});

// Provider
const ExecutionSitesProvider = (props) => {
    const { cityId } = props;
    const [executionSites, setExecutionSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showExecutionLayer, setShowExecutionLayer] = useState(false);

    useEffect(() => {
        getAllExecutionSites();
    }, [cityId]);

    // GET ALL (for the given city, or every site if no cityId was passed)
    const getAllExecutionSites = async () => {
        setLoading(true);
        try {
            const result = await get_execution_sites_service(cityId);
            if (result.status === 200) {
                setExecutionSites(result.data);
            }
        } catch (error) {
            setError("Failed to load execution sites");
        } finally {
            setLoading(false);
        }
    };

    // CREATE
    const createExecutionSite = async (data) => {
        setLoading(true);
        try {
            const result = await create_execution_site_service(data);
            await getAllExecutionSites();
            return result;
        } catch (error) {
            setError("Failed to create execution site");
        } finally {
            setLoading(false);
        }
    };

    // UPDATE
    const updateExecutionSite = async (id, data) => {
        setLoading(true);
        try {
            const result = await update_execution_site_service(id, data);
            await getAllExecutionSites();
            return result;
        } catch (error) {
            setError("Failed to update execution site");
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const deleteExecutionSite = async (id) => {
        setLoading(true);
        try {
            const result = await delete_execution_site_service(id);
            await getAllExecutionSites();
            return result;
        } catch (error) {
            setError("Failed to delete execution site");
        } finally {
            setLoading(false);
        }
    };

    const toggleExecutionLayer = () => setShowExecutionLayer((prev) => !prev);

    const values = {
        executionSites,
        loading,
        error,
        showExecutionLayer,
        toggleExecutionLayer,
        getAllExecutionSites,
        createExecutionSite,
        updateExecutionSite,
        deleteExecutionSite,
    };

    return (
        <ExecutionSitesContext.Provider value={values}>
            {props.children}
        </ExecutionSitesContext.Provider>
    );
};

const useExecutionSitesContext = () => useContext(ExecutionSitesContext);

export { ExecutionSitesProvider, useExecutionSitesContext };

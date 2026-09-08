import { createContext, useContext, useState, useEffect } from "react";
import {
    get_eras_service,
    create_era_service,
    update_era_service,
    delete_era_service,
} from "../Services/ErasService";

// Context global
const ErasContext = createContext({});

// Provider
const ErasProvider = (props) => {
    const { cityId } = props;
    const [eras, setEras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllEras();
    }, [cityId]);

    // GET ALL (for the given city, or every era if no cityId was passed)
    const getAllEras = async () => {
        setLoading(true);
        try {
            const result = await get_eras_service(cityId);
            if (result.status === 200) {
                setEras(result.data);
            }
        } catch (error) {
            setError("Failed to load eras");
        } finally {
            setLoading(false);
        }
    };

    // CREATE
    const createEra = async (data) => {
        setLoading(true);
        try {
            const result = await create_era_service(data);
            await getAllEras();
            return result;
        } catch (error) {
            setError("Failed to create era");
        } finally {
            setLoading(false);
        }
    };

    // UPDATE
    const updateEra = async (id, data) => {
        setLoading(true);
        try {
            const result = await update_era_service(id, data);
            await getAllEras();
            return result;
        } catch (error) {
            setError("Failed to update era");
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const deleteEra = async (id) => {
        setLoading(true);
        try {
            const result = await delete_era_service(id);
            await getAllEras();
            return result;
        } catch (error) {
            setError("Failed to delete era");
        } finally {
            setLoading(false);
        }
    };

    const values = { eras, loading, error, getAllEras, createEra, updateEra, deleteEra };

    return (
        <ErasContext.Provider value={values}>
            {props.children}
        </ErasContext.Provider>
    );
};

const useErasContext = () => useContext(ErasContext);

export { ErasProvider, useErasContext };

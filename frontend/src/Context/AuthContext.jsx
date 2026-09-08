import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_user, logout_user, checkAuth_user_service } from "../Services/Auth";

// Context global
const UserContext = createContext({});

// Provider
const UserProvider = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    const checkAuthUser = async () => {
        try {
            const result = await checkAuth_user_service();
            if (result.status === 200 && result.data) {
                setUser(result.data);
            }
        } catch {
            setUser(null);
        } finally {
            setIsAuthChecked(true);
        }
    };

    useEffect(() => {
        checkAuthUser();
    }, []);

    const login = async (data) => {
        try {
            const result = await login_user(data);
            if (result.status === 201) {
                setUser(result.data);
                setError(null);
                navigate("/admin");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Kredenciale të pasakta");
        }
    };

    const logout = async () => {
        try {
            await logout_user();
            setUser(null);
            navigate("/admin/login");
        } catch (error) {
            return error;
        }
    };

    const values = { user, error, setError, isAuthChecked, login, logout, checkAuthUser };

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };

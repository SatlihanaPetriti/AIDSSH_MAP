import { Navigate } from "react-router-dom";
import { useUserContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isAuthChecked } = useUserContext();

    if (!isAuthChecked) return null;

    if (!user) return <Navigate to="/admin/login" replace />;

    if (requiredRole && user.role !== requiredRole) return <Navigate to="/admin/login" replace />;

    return children;
};

export default ProtectedRoute;

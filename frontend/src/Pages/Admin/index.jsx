import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../../Context/AuthContext";
import ProtectedRoute from "../../Services/ProtectedRoute";
import AdminLayout from "../../components/Admin/AdminLayout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CityDetail from "./CityDetail";

const AdminRouter = () => {
    return (
        <UserProvider>
            <Routes>
                <Route path="login" element={<Login />} />

                <Route
                    path=""
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminLayout wide>
                                <Dashboard />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="cities/:cityId"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminLayout>
                                <CityDetail />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </UserProvider>
    );
};

export default AdminRouter;

import { Link } from "react-router-dom";
import { useUserContext } from "../../Context/AuthContext";
import logo from "../../assets/logo.svg";
import "./admin.css";

const AdminLayout = ({ children }) => {
    const { user, logout } = useUserContext();

    return (
        <div className="admin-shell">
            <header className="admin-topbar">
                <Link to="/admin" className="admin-topbar-brand">
                    <img src={logo} alt="AIDSSH" />
                    <span>Paneli i Administrimit</span>
                </Link>

                <div className="admin-topbar-actions">
                    <Link to="/" className="admin-topbar-link">Faqja publike</Link>
                    {user?.email && <span className="admin-topbar-user">{user.email}</span>}
                    <button type="button" className="admin-btn admin-btn-outline" onClick={logout}>
                        Dil
                    </button>
                </div>
            </header>

            <div className="admin-content">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;

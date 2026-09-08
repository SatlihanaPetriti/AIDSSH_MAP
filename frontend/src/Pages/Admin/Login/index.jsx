import { useState } from "react";
import { useUserContext } from "../../../Context/AuthContext";
import logo from "../../../assets/logo.svg";
import "./index.css";

const Login = () => {
    const { login, error, setError } = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        await login({ email, password });
        setSubmitting(false);
    };

    return (
        <div id="admin-login">
            <form className="admin-login-card" onSubmit={handleSubmit}>
                <img src={logo} alt="AIDSSH" className="admin-login-logo" />
                <h1>Paneli i Administrimit</h1>

                {error && <div className="admin-login-error">{error}</div>}

                <label className="admin-field">
                    <span>Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label className="admin-field">
                    <span>Fjalëkalimi</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
                    {submitting ? "Duke hyrë..." : "Hyr"}
                </button>
            </form>
        </div>
    );
};

export default Login;

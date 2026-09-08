import { Link } from "react-router-dom";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import { useMapUIContext } from "../../Context/MapUIContext";
import logo from "../../assets/logo.svg";
import "./index.css";

const Header = ({ city }) => {
    const { showExecutionLayer, toggleExecutionLayer } = useExecutionSitesContext();
    const { filteredSites } = useMapUIContext();

    return (
        <header id="header">
            <Link to="/" className="header-logo" title="Kthehu te qytetet">
                <img src={logo} alt="AIDSSH" className="header-logo-img" />
            </Link>

            <div className="header-sep" />

            <div className="header-title">
                <h1>Harta e Dosjeve ORV{city ? ` — ${city.name}` : ""}</h1>
                <p>{city?.subtitle || "AIDSSH"}</p>
            </div>

            <button
                className={`header-map-toggle ${showExecutionLayer ? "active" : ""}`}
                type="button"
                onClick={toggleExecutionLayer}
                title="Shfaq/fshih hartën e zonave të ekzekutimit dhe varrimit"
            >
                <span className="header-map-toggle-dot" />
                Harta e Ekzekutimeve/Varrimeve
            </button>

            <div className="header-count">
                <div className="count-badge">
                    <strong>{filteredSites.length}</strong> Objekte
                </div>
            </div>
        </header>
    );
};

export default Header;

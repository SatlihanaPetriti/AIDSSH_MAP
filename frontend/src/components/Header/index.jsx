import { Link } from "react-router-dom";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import { useMapUIContext } from "../../Context/MapUIContext";
import logo from "../../assets/logo.svg";
import "./index.css";

const Header = ({ city }) => {
    const { executionSites, showExecutionLayer, toggleExecutionLayer } = useExecutionSitesContext();
    const { filteredSites } = useMapUIContext();
    const hasExecutionSites = executionSites.length > 0;

    return (
        <header id="header">
            <Link to="/" className="header-logo" title="Kthehu te qytetet">
                <img src={logo} alt="AIDSSH" className="header-logo-img" />
            </Link>

            <div className="header-title">
                <h1>Harta e Dosjeve ORV{city ? ` — ${city.name}` : ""}</h1>
                {city?.subtitle && <p>{city.subtitle}</p>}
            </div>

            <button
                className={`header-map-toggle ${showExecutionLayer ? "active" : ""}`}
                type="button"
                onClick={toggleExecutionLayer}
                disabled={!hasExecutionSites}
                aria-pressed={showExecutionLayer}
                title={hasExecutionSites ? "Kalo midis hartës së objekteve dhe hartës së ekzekutimeve/varrimeve" : "Nuk ka ende vende ekzekutimi/varrimi për këtë qytet"}
            >
                {showExecutionLayer ? "Kthehu te objektet" : "Harta e ekzekutimeve/varrimeve"}
            </button>

            <div className="header-count">
                <strong>{filteredSites.length}</strong> objekte
            </div>
        </header>
    );
};

export default Header;

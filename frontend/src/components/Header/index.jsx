import { useSitesContext } from "../../Context/SitesContext";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import "./index.css";

const Header = () => {
    const { sites } = useSitesContext();
    const { showExecutionLayer, toggleExecutionLayer } = useExecutionSitesContext();

    return (
        <header id="header">
            <div className="header-title">
                <h1>Harta e Dosjeve ORV</h1>
                <p>DPB Tiranë</p>
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
                    <strong>{sites.length}</strong> Objekte
                </div>
            </div>
        </header>
    );
};

export default Header;

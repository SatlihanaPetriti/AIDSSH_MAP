import { MapContainer, TileLayer } from "react-leaflet";
import { useSitesContext } from "../../Context/SitesContext";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import OrvMarkers from "./OrvMarkers";
import ExecutionLayer from "./ExecutionLayer";
import "./index.css";

const DEFAULT_COORDINATES = [41.33, 19.82];
const DEFAULT_ZOOM = 12;

const Map = () => {
    const { sites, loading, error } = useSitesContext();
    const { executionSites, showExecutionLayer } = useExecutionSitesContext();

    return (
        <main id="map-container">
            {loading && <div className="map-status">Duke ngarkuar...</div>}
            {error && <div className="map-status map-status-error">{error}</div>}

            <MapContainer center={DEFAULT_COORDINATES} zoom={DEFAULT_ZOOM} zoomControl={false}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    subdomains="abcd"
                    maxZoom={19}
                />

                <OrvMarkers sites={sites} />
                {showExecutionLayer && <ExecutionLayer sites={executionSites} />}
            </MapContainer>
        </main>
    );
};

export default Map;

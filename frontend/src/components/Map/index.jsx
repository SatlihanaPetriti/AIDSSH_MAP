import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useSitesContext } from "../../Context/SitesContext";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import { useMapUIContext } from "../../Context/MapUIContext";
import MapRefSetter from "./MapRefSetter";
import GisLayers from "./GisLayers";
import OrvMarkers from "./OrvMarkers";
import ExecutionLayer from "./ExecutionLayer";
import Legend from "./Legend";
import ExecutionLegend from "./ExecutionLegend";
import "./index.css";

const Map = ({ city }) => {
    const { loading, error } = useSitesContext();
    const { executionSites, showExecutionLayer } = useExecutionSitesContext();
    const { filteredSites } = useMapUIContext();

    const center = [city.lat, city.lon];

    return (
        <section id="map-container" aria-label="Harta interaktive">
            {loading && <div className="map-status">Duke ngarkuar...</div>}
            {error && <div className="map-status map-status-error">{error}</div>}

            <MapContainer center={center} zoom={city.zoom} zoomControl={false}>
                <MapRefSetter />
                <ZoomControl position="bottomright" />

                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                    maxZoom={20}
                    maxNativeZoom={19}
                    attribution="Tiles &copy; Esri &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS"
                />

                <GisLayers />

                {!showExecutionLayer && <OrvMarkers sites={filteredSites} />}
                {showExecutionLayer && <ExecutionLayer sites={executionSites} />}
            </MapContainer>

            {!showExecutionLayer && <Legend />}
            {showExecutionLayer && <ExecutionLegend />}
        </section>
    );
};

export default Map;

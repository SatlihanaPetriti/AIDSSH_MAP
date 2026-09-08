import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import albaniaBorderData from "../../assets/gis/albaniaBorder.json";
import municipalitiesData from "../../assets/gis/municipalities.json";

const ALBANIA_STYLE = {
    color: "#5b0000",
    weight: 1.5,
    opacity: 1,
    fill: false,
    lineJoin: "round",
    lineCap: "round",
    interactive: false,
};

const TIRANA_STYLE = {
    color: "#8b0000",
    weight: 1.2,
    opacity: 0.8,
    fillColor: "#ffffff",
    fillOpacity: 0,
    lineJoin: "round",
    lineCap: "round",
};

const getMunicipalityName = (feature) => {
    const p = feature.properties || {};
    return p.shapeName || p.ADM2_EN || p.ADM2_SQ || p.NAME_2 || p.NAME || p.name || p.Name || "Bashki";
};

const GisLayers = () => {
    const map = useMap();

    useEffect(() => {
        if (!map.getPane("gisPane")) {
            map.createPane("gisPane");
            map.getPane("gisPane").style.zIndex = 350;
        }
        if (!map.getPane("gisBorderPane")) {
            map.createPane("gisBorderPane");
            map.getPane("gisBorderPane").style.zIndex = 360;
        }

        const albaniaBorderLayer = L.geoJSON(albaniaBorderData, {
            pane: "gisBorderPane",
            style: ALBANIA_STYLE,
        }).addTo(map);

        const tiranaOnly = {
            type: "FeatureCollection",
            features: municipalitiesData.features.filter((f) => getMunicipalityName(f) === "Tiranë"),
        };

        const municipalitiesLayer = L.geoJSON(tiranaOnly, {
            pane: "gisPane",
            style: TIRANA_STYLE,
            onEachFeature: (feature, layer) => {
                layer.on("click", () => {
                    map.flyToBounds(layer.getBounds(), {
                        padding: [40, 40],
                        duration: 1.2,
                        easeLinearity: 0.3,
                    });
                });
            },
        }).addTo(map);

        return () => {
            map.removeLayer(albaniaBorderLayer);
            map.removeLayer(municipalitiesLayer);
        };
    }, [map]);

    return null;
};

export default GisLayers;

import municipalitiesData from "../assets/gis/municipalities.json";

export const getMunicipalityName = (feature) => {
    const p = feature.properties || {};
    return p.shapeName || p.ADM2_EN || p.ADM2_SQ || p.NAME_2 || p.NAME || p.name || p.Name || "Bashki";
};

export const MUNICIPALITY_NAMES = [...new Set(
    municipalitiesData.features.map(getMunicipalityName)
)].sort((a, b) => a.localeCompare(b, "sq"));

const collectPoints = (geometry, points) => {
    if (!geometry) return;
    if (geometry.type === "Polygon") {
        geometry.coordinates.forEach((ring) => ring.forEach(([lon, lat]) => points.push([lat, lon])));
    } else if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach((polygon) =>
            polygon.forEach((ring) => ring.forEach(([lon, lat]) => points.push([lat, lon])))
        );
    }
};

// Bounding-box center of a municipality's polygon, plus a zoom level that
// roughly fits its extent — used to auto-fill the city form.
export const getMunicipalityCenter = (name) => {
    const feature = municipalitiesData.features.find((f) => getMunicipalityName(f) === name);
    if (!feature) return null;

    const points = [];
    collectPoints(feature.geometry, points);
    if (!points.length) return null;

    const lats = points.map((p) => p[0]);
    const lons = points.map((p) => p[1]);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    const span = Math.max(maxLat - minLat, maxLon - minLon);
    let zoom = 14;
    if (span > 0.5) zoom = 10;
    else if (span > 0.25) zoom = 11;
    else if (span > 0.12) zoom = 12;
    else if (span > 0.06) zoom = 13;

    return {
        lat: (minLat + maxLat) / 2,
        lon: (minLon + maxLon) / 2,
        zoom,
    };
};

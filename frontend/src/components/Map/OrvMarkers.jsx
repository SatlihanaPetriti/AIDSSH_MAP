import { useMemo } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { getCategories, getTypeConfig } from "../../db/typeConfig";
import { useMapUIContext } from "../../Context/MapUIContext";
import { createPinIcon } from "./icons";

const OrvMarkers = ({ sites }) => {
    const { labelsVisible, registerMarker, highlightListItem } = useMapUIContext();

    // Memoized so marker position/icon stay referentially stable across
    // unrelated context re-renders (e.g. clicking a marker) — otherwise
    // Leaflet replaces the icon element while a popup is opening, which
    // breaks the popup's position calculation.
    const markersData = useMemo(
        () =>
            sites.map((site, index) => {
                const primaryCategory = getCategories(site.tipiRaw)[0];
                const { color } = getTypeConfig(primaryCategory);
                return {
                    site,
                    color,
                    position: [site.lat, site.lon],
                    icon: createPinIcon(color, Math.min(index * 12, 600)),
                };
            }),
        [sites]
    );

    return (
        <>
            {markersData.map(({ site, color, position, icon }) => (
                <Marker
                    key={site.id}
                    position={position}
                    icon={icon}
                    ref={(marker) => registerMarker(site.id, marker)}
                    eventHandlers={{
                        click: () => highlightListItem(site.id),
                        popupclose: (e) => {
                            if (labelsVisible) e.target.openTooltip();
                        },
                    }}
                >
                    {labelsVisible && (
                        <Tooltip permanent direction="top" offset={[0, -32]} className="marker-label">
                            {site.objekti}
                        </Tooltip>
                    )}
                    <Popup maxWidth={300}>
                        <div className="popup-inner">
                            <div
                                className="popup-type-badge"
                                style={{ background: `${color}1c`, color, border: `1px solid ${color}44` }}
                            >
                                {site.tipiRaw}
                            </div>
                            <div className="popup-name">{site.objekti}</div>
                            <div className="popup-divider" />
                            <div className="popup-detail">
                                <span className="lbl">Dosja</span>
                                <span className="val">{site.dosja}</span>
                            </div>
                            <div className="popup-detail">
                                <span className="lbl">Fondi</span>
                                <span className="val">{site.fondi}</span>
                            </div>
                            {(site.dataHapjes || site.dataMbylljes) && <div className="popup-divider" />}
                            {site.dataHapjes && (
                                <div className="popup-detail">
                                    <span className="lbl">Hapur</span>
                                    <span className="val">{site.dataHapjes}</span>
                                </div>
                            )}
                            {site.dataMbylljes && (
                                <div className="popup-detail">
                                    <span className="lbl">Mbyllur</span>
                                    <span className="val">{site.dataMbylljes}</span>
                                </div>
                            )}
                            <div className="popup-divider" />
                            <div className="popup-coords">
                                {site.lat.toFixed(5)}, {site.lon.toFixed(5)}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default OrvMarkers;

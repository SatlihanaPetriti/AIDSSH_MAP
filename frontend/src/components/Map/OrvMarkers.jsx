import { Marker, Popup } from "react-leaflet";
import { getCategories, getTypeConfig } from "../../db/typeConfig";
import { createPinIcon } from "./icons";

const OrvMarkers = ({ sites }) => {
    return (
        <>
            {sites.map((site) => {
                const primaryCategory = getCategories(site.tipiRaw)[0];
                const { color } = getTypeConfig(primaryCategory);

                return (
                    <Marker key={site.id} position={[site.lat, site.lon]} icon={createPinIcon(color)}>
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
                                <div className="popup-detail">
                                    <span className="lbl">Tipi</span>
                                    <span className="val" style={{ opacity: 0.75 }}>{site.tipiRaw}</span>
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
                );
            })}
        </>
    );
};

export default OrvMarkers;

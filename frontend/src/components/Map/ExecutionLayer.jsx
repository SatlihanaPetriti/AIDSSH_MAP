import { Fragment } from "react";
import { Circle, Marker, Popup } from "react-leaflet";
import { EXECUTION_FADE_STOPS } from "../../db/typeConfig";
import { createLabelIcon } from "./icons";

const ExecutionLayer = ({ sites }) => {
    return (
        <>
            {sites.map((site) => (
                <Fragment key={site.id}>
                    {EXECUTION_FADE_STOPS.map((stop, index) => (
                        <Circle
                            key={index}
                            center={[site.lat, site.lon]}
                            radius={site.fadeMaxRadius * stop.f}
                            stroke={false}
                            fillColor={site.color}
                            fillOpacity={stop.opacity}
                            interactive={false}
                        />
                    ))}

                    <Marker position={[site.lat, site.lon]} icon={createLabelIcon(site.name, site.color)}>
                        <Popup maxWidth={245} minWidth={155} className="execution-small-popup">
                            <div className="popup-inner">
                                <div className="popup-name">{site.name}</div>
                                <div className="popup-divider" />
                                <div
                                    className="popup-detail"
                                    style={{ display: "block" }}
                                    dangerouslySetInnerHTML={{ __html: site.description }}
                                />
                            </div>
                        </Popup>
                    </Marker>
                </Fragment>
            ))}
        </>
    );
};

export default ExecutionLayer;

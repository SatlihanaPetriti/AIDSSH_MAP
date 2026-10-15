import { useState } from "react";
import { useMapUIContext } from "../../Context/MapUIContext";

const Legend = () => {
    const { typeList, selectedType, selectType } = useMapUIContext();
    // Në ekran të vogël legjenda fillon e mbyllur që të mos mbulojë hartën
    const [open, setOpen] = useState(() => !window.matchMedia("(max-width: 768px)").matches);

    return (
        <div className={`map-legend ${open ? "" : "closed"}`}>
            <button
                type="button"
                className="legend-header"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className="legend-title">Legjenda</span>
                <svg
                    className="legend-chevron"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    style={{ transform: open ? "rotate(180deg)" : "" }}
                >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div className="legend-body">
                    {typeList.map(({ type, color, label, count }) => (
                        <div
                            key={type}
                            className={`legend-item ${selectedType === type ? "selected" : ""} ${selectedType && selectedType !== type ? "dimmed" : ""}`}
                            onClick={() => selectType(type)}
                        >
                            <div className="legend-dot" style={{ background: color }} />
                            {label}
                            <span className="legend-count">{count}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Legend;

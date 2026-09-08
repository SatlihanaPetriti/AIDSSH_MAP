import { useMapUIContext } from "../../Context/MapUIContext";

const Legend = () => {
    const { typeList, selectedType, selectType } = useMapUIContext();

    return (
        <div className="map-legend">
            <div className="legend-title">Legjenda</div>
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
    );
};

export default Legend;

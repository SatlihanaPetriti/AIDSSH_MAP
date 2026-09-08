import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapUIContext } from "../../Context/MapUIContext";

const MapRefSetter = () => {
    const map = useMap();
    const { setMapInstance } = useMapUIContext();

    useEffect(() => {
        setMapInstance(map);
    }, [map, setMapInstance]);

    return null;
};

export default MapRefSetter;

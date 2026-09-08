import { useMapUIContext } from "../../Context/MapUIContext";
import "./index.css";

const Toast = () => {
    const { toast } = useMapUIContext();

    return (
        <div className={`toast ${toast.visible ? "show" : ""}`}>
            {toast.message}
        </div>
    );
};

export default Toast;

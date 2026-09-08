import { Routes, Route } from "react-router-dom";
import { CitiesProvider } from "./Context/CitiesContext";
import Home from "./Pages/Home";
import CityMap from "./Pages/CityMap";
import AdminRouter from "./Pages/Admin";

function App() {
    return (
        <CitiesProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/harta/:slug" element={<CityMap />} />
                <Route path="/admin/*" element={<AdminRouter />} />
            </Routes>
        </CitiesProvider>
    );
}

export default App;

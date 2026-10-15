import { useParams, Navigate } from "react-router-dom";
import { useCitiesContext } from "../../Context/CitiesContext";
import { SitesProvider } from "../../Context/SitesContext";
import { ExecutionSitesProvider } from "../../Context/ExecutionSitesContext";
// import { ErasProvider } from "../../Context/ErasContext"; // filtri i periudhës (çaktivizuar)
import { MapUIProvider } from "../../Context/MapUIContext";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";
import Toast from "../../components/Toast";

const CityMap = () => {
    const { slug } = useParams();
    const { cities, loading } = useCitiesContext();

    if (loading) {
        return <div className="page-status">Duke ngarkuar...</div>;
    }

    const city = cities.find((c) => c.slug === slug);

    if (!city) {
        return <Navigate to="/" replace />;
    }

    return (
        <SitesProvider cityId={city.id}>
            <ExecutionSitesProvider cityId={city.id}>
                {/* <ErasProvider cityId={city.id}> */}
                    <MapUIProvider>
                        <div id="app" className="visible shown">
                            <Header city={city} />
                            <main id="main">
                                <Sidebar />
                                <Map city={city} />
                            </main>
                        </div>
                        <Toast />
                    </MapUIProvider>
                {/* </ErasProvider> */}
            </ExecutionSitesProvider>
        </SitesProvider>
    );
};

export default CityMap;

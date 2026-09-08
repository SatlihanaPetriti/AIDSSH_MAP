import { useParams, Link } from "react-router-dom";
import { useCitiesContext } from "../../../Context/CitiesContext";
import { SitesProvider } from "../../../Context/SitesContext";
import { ExecutionSitesProvider } from "../../../Context/ExecutionSitesContext";
import { ErasProvider } from "../../../Context/ErasContext";
import SitesAdmin from "../../../components/Admin/SitesAdmin";
import ExecutionSitesAdmin from "../../../components/Admin/ExecutionSitesAdmin";
import ErasAdmin from "../../../components/Admin/ErasAdmin";

const CityDetail = () => {
    const { cityId } = useParams();
    const { cities, loading } = useCitiesContext();

    if (loading) {
        return <div className="admin-status">Duke ngarkuar...</div>;
    }

    const city = cities.find((c) => String(c.id) === cityId);

    if (!city) {
        return <div className="admin-status">Qyteti nuk u gjet.</div>;
    }

    return (
        <SitesProvider cityId={city.id}>
            <ExecutionSitesProvider cityId={city.id}>
                <ErasProvider cityId={city.id}>
                    <div>
                        <Link to="/admin" className="admin-back-link">← Të gjitha qytetet</Link>

                        <div className="admin-page-header">
                            <h1>{city.name}</h1>
                        </div>
                        {city.subtitle && <p className="admin-subtitle">{city.subtitle}</p>}

                        <SitesAdmin cityId={city.id} />
                        <ExecutionSitesAdmin cityId={city.id} />
                        <ErasAdmin cityId={city.id} />
                    </div>
                </ErasProvider>
            </ExecutionSitesProvider>
        </SitesProvider>
    );
};

export default CityDetail;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCitiesContext } from "../../../Context/CitiesContext";
import CityForm from "../../../components/Admin/CityForm";

const Dashboard = () => {
    const { cities, loading, createCity, updateCity, deleteCity } = useCitiesContext();
    const [editingCity, setEditingCity] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const openCreate = () => {
        setEditingCity(null);
        setShowForm(true);
    };

    const openEdit = (city) => {
        setEditingCity(city);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingCity(null);
    };

    const handleSubmit = async (data) => {
        if (editingCity) {
            await updateCity(editingCity.id, data);
        } else {
            await createCity(data);
        }
        closeForm();
    };

    const handleDelete = async (city) => {
        if (!window.confirm(`Fshi qytetin "${city.name}"? Kjo do të fshijë edhe gjithë të dhënat e tij.`)) return;
        await deleteCity(city.id);
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>Qytetet</h1>
                <button type="button" className="admin-btn admin-btn-primary" onClick={openCreate}>
                    + Shto qytet
                </button>
            </div>

            {showForm && (
                <CityForm initialData={editingCity} onSubmit={handleSubmit} onCancel={closeForm} />
            )}

            {loading && <div className="admin-status">Duke ngarkuar...</div>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Emri</th>
                        <th>Slug</th>
                        <th>Nëntitulli</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map((city) => (
                        <tr key={city.id}>
                            <td>{city.name}</td>
                            <td>{city.slug}</td>
                            <td>{city.subtitle}</td>
                            <td className="admin-table-actions">
                                <Link to={`/admin/cities/${city.id}`} className="admin-btn admin-btn-outline">
                                    Menaxho të dhënat
                                </Link>
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => openEdit(city)}>
                                    Ndrysho
                                </button>
                                <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDelete(city)}>
                                    Fshi
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!loading && cities.length === 0 && (
                <div className="admin-table-empty">Ende nuk ka asnjë qytet.</div>
            )}
        </div>
    );
};

export default Dashboard;

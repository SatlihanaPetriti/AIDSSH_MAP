import { useState } from "react";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import ExecutionSiteForm from "./ExecutionSiteForm";

const ExecutionSitesAdmin = ({ cityId }) => {
    const { executionSites, loading, createExecutionSite, updateExecutionSite, deleteExecutionSite } = useExecutionSitesContext();
    const [editingSite, setEditingSite] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const openCreate = () => {
        setEditingSite(null);
        setShowForm(true);
    };

    const openEdit = (site) => {
        setEditingSite(site);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingSite(null);
    };

    const handleSubmit = async (data) => {
        const payload = { ...data, cityId };
        if (editingSite) {
            await updateExecutionSite(editingSite.id, payload);
        } else {
            await createExecutionSite(payload);
        }
        closeForm();
    };

    const handleDelete = async (site) => {
        if (!window.confirm(`Fshi vendin "${site.name}"?`)) return;
        await deleteExecutionSite(site.id);
    };

    return (
        <section className="admin-section">
            <div className="admin-section-header">
                <h2>Vendet e Ekzekutimit/Varrimit ({executionSites.length})</h2>
                <button type="button" className="admin-btn admin-btn-primary" onClick={openCreate}>
                    + Shto vend
                </button>
            </div>

            {showForm && (
                <ExecutionSiteForm initialData={editingSite} onSubmit={handleSubmit} onCancel={closeForm} />
            )}

            {loading && <div className="admin-status">Duke ngarkuar...</div>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Emri</th>
                        <th>Tipi</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {executionSites.map((site) => (
                        <tr key={site.id}>
                            <td>{site.name}</td>
                            <td>{site.type}</td>
                            <td className="admin-table-actions">
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => openEdit(site)}>
                                    Ndrysho
                                </button>
                                <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDelete(site)}>
                                    Fshi
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!loading && executionSites.length === 0 && (
                <div className="admin-table-empty">Ende nuk ka vende ekzekutimi/varrimi për këtë qytet.</div>
            )}
        </section>
    );
};

export default ExecutionSitesAdmin;

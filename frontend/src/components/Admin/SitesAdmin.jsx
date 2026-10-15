import { useState } from "react";
import { useSitesContext } from "../../Context/SitesContext";
import SiteForm from "./SiteForm";
import CollapsibleSection from "./CollapsibleSection";

const SitesAdmin = ({ cityId }) => {
    const { sites, loading, createSite, updateSite, deleteSite } = useSitesContext();
    const [editingSite, setEditingSite] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [open, setOpen] = useState(false);

    const openCreate = () => {
        setEditingSite(null);
        setShowForm(true);
        setOpen(true);
    };

    const openEdit = (site) => {
        setEditingSite(site);
        setShowForm(true);
        setOpen(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingSite(null);
    };

    const handleSubmit = async (data) => {
        const payload = { ...data, cityId };
        if (editingSite) {
            await updateSite(editingSite.id, payload);
        } else {
            await createSite(payload);
        }
        closeForm();
    };

    const handleDelete = async (site) => {
        if (!window.confirm(`Fshi objektin "${site.objekti}"?`)) return;
        await deleteSite(site.id);
    };

    return (
        <CollapsibleSection
            title="Objektet ORV"
            count={sites.length}
            open={open}
            onToggle={() => setOpen((prev) => !prev)}
            actions={
                <button type="button" className="admin-btn admin-btn-primary" onClick={openCreate}>
                    + Shto objekt
                </button>
            }
        >
            {showForm && (
                <SiteForm initialData={editingSite} onSubmit={handleSubmit} onCancel={closeForm} />
            )}

            {loading && <div className="admin-status">Duke ngarkuar...</div>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Objekti</th>
                        <th>Dosja</th>
                        <th>Tipi</th>
                        <th>Fondi</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((site) => (
                        <tr key={site.id}>
                            <td data-label="Objekti">{site.objekti}</td>
                            <td data-label="Dosja">{site.dosja}</td>
                            <td data-label="Tipi">{site.tipiRaw}</td>
                            <td data-label="Fondi">{site.fondi}</td>
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

            {!loading && sites.length === 0 && (
                <div className="admin-table-empty">Ende nuk ka objekte për këtë qytet.</div>
            )}
        </CollapsibleSection>
    );
};

export default SitesAdmin;

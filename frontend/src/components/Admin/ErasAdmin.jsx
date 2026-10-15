import { useState } from "react";
import { useErasContext } from "../../Context/ErasContext";
import EraForm from "./EraForm";
import CollapsibleSection from "./CollapsibleSection";

const ErasAdmin = ({ cityId }) => {
    const { eras, loading, createEra, updateEra, deleteEra } = useErasContext();
    const [editingEra, setEditingEra] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [open, setOpen] = useState(true);

    const openCreate = () => {
        setEditingEra(null);
        setShowForm(true);
        setOpen(true);
    };

    const openEdit = (era) => {
        setEditingEra(era);
        setShowForm(true);
        setOpen(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingEra(null);
    };

    const handleSubmit = async (data) => {
        const payload = { ...data, cityId };
        if (editingEra) {
            await updateEra(editingEra.id, payload);
        } else {
            await createEra(payload);
        }
        closeForm();
    };

    const handleDelete = async (era) => {
        if (!window.confirm(`Fshi periudhën "${era.label}"?`)) return;
        await deleteEra(era.id);
    };

    return (
        <CollapsibleSection
            title="Filtri i Periudhës"
            count={eras.length}
            open={open}
            onToggle={() => setOpen((prev) => !prev)}
            actions={
                <button type="button" className="admin-btn admin-btn-primary" onClick={openCreate}>
                    + Shto periudhë
                </button>
            }
        >
            {showForm && (
                <EraForm initialData={editingEra} onSubmit={handleSubmit} onCancel={closeForm} />
            )}

            {loading && <div className="admin-status">Duke ngarkuar...</div>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Etiketa</th>
                        <th>Viti fillestar</th>
                        <th>Viti përfundimtar</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {eras.map((era) => (
                        <tr key={era.id}>
                            <td data-label="Etiketa">{era.label}</td>
                            <td data-label="Viti fillestar">{era.startYear}</td>
                            <td data-label="Viti përfundimtar">{era.endYear}</td>
                            <td className="admin-table-actions">
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => openEdit(era)}>
                                    Ndrysho
                                </button>
                                <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDelete(era)}>
                                    Fshi
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!loading && eras.length === 0 && (
                <div className="admin-table-empty">Ende nuk ka periudha të përcaktuara për këtë qytet.</div>
            )}
        </CollapsibleSection>
    );
};

export default ErasAdmin;

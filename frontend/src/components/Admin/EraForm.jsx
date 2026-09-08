import { useState, useEffect } from "react";

const EMPTY = { label: "", startYear: "", endYear: "" };

const EraForm = ({ initialData, onSubmit, onCancel }) => {
    const [form, setForm] = useState(EMPTY);

    useEffect(() => {
        setForm(initialData ? { ...EMPTY, ...initialData } : EMPTY);
    }, [initialData]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const startYear = parseInt(form.startYear, 10);
        const endYear = parseInt(form.endYear, 10);
        if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) {
            alert("Vitet duhet të jenë numra, p.sh. 1969");
            return;
        }

        onSubmit({
            label: form.label,
            startYear,
            endYear,
        });
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
                <label className="admin-field">
                    <span>Etiketa</span>
                    <input value={form.label} onChange={handleChange("label")} placeholder="p.sh. 1969–1979" required />
                </label>

                <label className="admin-field">
                    <span>Viti fillestar</span>
                    <input type="number" value={form.startYear} onChange={handleChange("startYear")} placeholder="1969" required />
                </label>

                <label className="admin-field">
                    <span>Viti përfundimtar</span>
                    <input type="number" value={form.endYear} onChange={handleChange("endYear")} placeholder="1979" required />
                </label>
            </div>

            <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">Ruaj</button>
                <button type="button" className="admin-btn admin-btn-outline" onClick={onCancel}>Anulo</button>
            </div>
        </form>
    );
};

export default EraForm;

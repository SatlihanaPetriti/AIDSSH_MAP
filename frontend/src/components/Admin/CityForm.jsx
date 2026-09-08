import { useState, useEffect } from "react";

const EMPTY = { name: "", slug: "", subtitle: "", lat: "", lon: "", zoom: 12 };

const CityForm = ({ initialData, onSubmit, onCancel }) => {
    const [form, setForm] = useState(EMPTY);

    useEffect(() => {
        setForm(initialData ? { ...EMPTY, ...initialData } : EMPTY);
    }, [initialData]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name: form.name,
            slug: form.slug,
            subtitle: form.subtitle,
            lat: parseFloat(form.lat),
            lon: parseFloat(form.lon),
            zoom: parseInt(form.zoom, 10) || 12,
        });
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
                <label className="admin-field">
                    <span>Emri i qytetit</span>
                    <input value={form.name} onChange={handleChange("name")} required />
                </label>

                <label className="admin-field">
                    <span>Slug (URL)</span>
                    <input value={form.slug} onChange={handleChange("slug")} placeholder="p.sh. elbasan" required />
                </label>

                <label className="admin-field">
                    <span>Nëntitulli</span>
                    <input value={form.subtitle} onChange={handleChange("subtitle")} placeholder="p.sh. DPB Elbasan" />
                </label>

                <label className="admin-field">
                    <span>Zoom fillestar</span>
                    <input type="number" value={form.zoom} onChange={handleChange("zoom")} />
                </label>

                <label className="admin-field">
                    <span>Lat (qendra e hartës)</span>
                    <input type="number" step="any" value={form.lat} onChange={handleChange("lat")} required />
                </label>

                <label className="admin-field">
                    <span>Lon (qendra e hartës)</span>
                    <input type="number" step="any" value={form.lon} onChange={handleChange("lon")} required />
                </label>
            </div>

            <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">Ruaj</button>
                <button type="button" className="admin-btn admin-btn-outline" onClick={onCancel}>Anulo</button>
            </div>
        </form>
    );
};

export default CityForm;

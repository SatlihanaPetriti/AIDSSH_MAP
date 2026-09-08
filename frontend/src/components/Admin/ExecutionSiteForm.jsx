import { useState, useEffect } from "react";

const EMPTY = {
    name: "",
    type: "ekzekutim_varrim",
    lat: "",
    lon: "",
    color: "#89191C",
    description: "",
    fadeMaxRadius: 1000,
};

const TYPE_OPTIONS = [
    { value: "ekzekutim_varrim", label: "Vend ekzekutimi & varrimi" },
    { value: "ekzekutim", label: "Vend ekzekutimi" },
    { value: "varrim", label: "Vend varrimi" },
];

const ExecutionSiteForm = ({ initialData, onSubmit, onCancel }) => {
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
            type: form.type,
            color: form.color,
            description: form.description,
            lat: parseFloat(form.lat),
            lon: parseFloat(form.lon),
            fadeMaxRadius: parseInt(form.fadeMaxRadius, 10) || 1000,
        });
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
                <label className="admin-field">
                    <span>Emri</span>
                    <input value={form.name} onChange={handleChange("name")} placeholder="p.sh. Mali i Dajtit" required />
                </label>

                <label className="admin-field">
                    <span>Tipi</span>
                    <select value={form.type} onChange={handleChange("type")}>
                        {TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>

                <label className="admin-field">
                    <span>Ngjyra</span>
                    <input type="color" value={form.color} onChange={handleChange("color")} />
                </label>

                <label className="admin-field">
                    <span>Rrezja e zbehjes (m)</span>
                    <input type="number" value={form.fadeMaxRadius} onChange={handleChange("fadeMaxRadius")} />
                </label>

                <label className="admin-field">
                    <span>Lat</span>
                    <input type="number" step="any" value={form.lat} onChange={handleChange("lat")} required />
                </label>

                <label className="admin-field">
                    <span>Lon</span>
                    <input type="number" step="any" value={form.lon} onChange={handleChange("lon")} required />
                </label>

                <label className="admin-field admin-field-wide">
                    <span>Përshkrimi (mund të përmbajë &lt;strong&gt;, &lt;br&gt;)</span>
                    <textarea value={form.description} onChange={handleChange("description")} required />
                </label>
            </div>

            <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">Ruaj</button>
                <button type="button" className="admin-btn admin-btn-outline" onClick={onCancel}>Anulo</button>
            </div>
        </form>
    );
};

export default ExecutionSiteForm;

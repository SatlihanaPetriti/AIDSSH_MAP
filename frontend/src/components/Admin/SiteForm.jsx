import { useState, useEffect } from "react";

const EMPTY = {
    dosja: "",
    objekti: "",
    tipiRaw: "",
    lat: "",
    lon: "",
    fondi: "",
    dataHapjes: "",
    dataMbylljes: "",
};

const SiteForm = ({ initialData, onSubmit, onCancel }) => {
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
            dosja: form.dosja,
            objekti: form.objekti,
            tipiRaw: form.tipiRaw,
            fondi: form.fondi,
            lat: parseFloat(form.lat),
            lon: parseFloat(form.lon),
            dataHapjes: form.dataHapjes || null,
            dataMbylljes: form.dataMbylljes || null,
        });
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
                <label className="admin-field">
                    <span>Objekti</span>
                    <input value={form.objekti} onChange={handleChange("objekti")} required />
                </label>

                <label className="admin-field">
                    <span>Dosja</span>
                    <input value={form.dosja} onChange={handleChange("dosja")} placeholder="p.sh. ORV nr.1754" required />
                </label>

                <label className="admin-field">
                    <span>Tipi</span>
                    <input value={form.tipiRaw} onChange={handleChange("tipiRaw")} placeholder="p.sh. Industrial" required />
                </label>

                <label className="admin-field">
                    <span>Fondi</span>
                    <input value={form.fondi} onChange={handleChange("fondi")} placeholder="p.sh. DPB Elbasan" required />
                </label>

                <label className="admin-field">
                    <span>Lat</span>
                    <input type="number" step="any" value={form.lat} onChange={handleChange("lat")} required />
                </label>

                <label className="admin-field">
                    <span>Lon</span>
                    <input type="number" step="any" value={form.lon} onChange={handleChange("lon")} required />
                </label>

                <label className="admin-field">
                    <span>Data hapjes</span>
                    <input value={form.dataHapjes || ""} onChange={handleChange("dataHapjes")} placeholder="p.sh. 16.04.1980" />
                </label>

                <label className="admin-field">
                    <span>Data mbylljes</span>
                    <input value={form.dataMbylljes || ""} onChange={handleChange("dataMbylljes")} placeholder="p.sh. 05.10.1984" />
                </label>
            </div>

            <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">Ruaj</button>
                <button type="button" className="admin-btn admin-btn-outline" onClick={onCancel}>Anulo</button>
            </div>
        </form>
    );
};

export default SiteForm;

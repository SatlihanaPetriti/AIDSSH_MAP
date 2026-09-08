import { useState, useEffect } from "react";
import { MUNICIPALITY_NAMES, getMunicipalityCenter } from "../../db/municipalities";

const EMPTY = { name: "", slug: "", subtitle: "", lat: "", lon: "", zoom: 12 };

const slugify = (text) =>
    text
        .normalize("NFD").replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const CityForm = ({ initialData, onSubmit, onCancel }) => {
    const [form, setForm] = useState(EMPTY);

    useEffect(() => {
        setForm(initialData ? { ...EMPTY, ...initialData } : EMPTY);
    }, [initialData]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // Picking a municipality auto-fills the coordinates from its GIS polygon
    // (bounding-box center + a zoom that roughly fits its extent), so nobody
    // has to look up lat/lon by hand. Fields left blank get filled in;
    // anything already typed is left alone.
    const handleMunicipalitySelect = (e) => {
        const name = e.target.value;
        if (!name) return;

        const center = getMunicipalityCenter(name);

        setForm((prev) => ({
            ...prev,
            name: prev.name || name,
            slug: prev.slug || slugify(name),
            subtitle: prev.subtitle || `DPB ${name}`,
            lat: center ? center.lat.toFixed(5) : prev.lat,
            lon: center ? center.lon.toFixed(5) : prev.lon,
            zoom: center ? center.zoom : prev.zoom,
        }));

        e.target.value = "";
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
            <label className="admin-field admin-field-wide">
                <span>Zgjidh nga lista e bashkive — plotëson vetë Lat/Lon/Zoom</span>
                <select defaultValue="" onChange={handleMunicipalitySelect}>
                    <option value="">— zgjidh bashkinë —</option>
                    {MUNICIPALITY_NAMES.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </label>

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

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useCitiesContext } from "../../Context/CitiesContext";
import { create_sites_bulk_service } from "../../Services/SitesService";
import { isCoordinate } from "./formUtils";

const normalize = (text) =>
    String(text || "")
        .normalize("NFD").replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim();


const HEADER_ALIASES = {
    qyteti: "qyteti", city: "qyteti",
    dosja: "dosja",
    objekti: "objekti",
    tipi: "tipi", "tipi raw": "tipi", tip: "tipi",
    fondi: "fondi",
    lat: "lat", latitude: "lat",
    lon: "lon", lng: "lon", longitude: "lon",
    "data hapjes": "dataHapjes",
    "data mbylljes": "dataMbylljes",
};

const ExcelImport = () => {
    const { cities } = useCitiesContext();
    const fileInputRef = useRef(null);

    const [fileName, setFileName] = useState("");
    const [rows, setRows] = useState(null);
    const [unmatchedCities, setUnmatchedCities] = useState([]);
    const [invalidCount, setInvalidCount] = useState(0);
    const [importing, setImporting] = useState(false);
    const [result, setResult] = useState(null);

    const findCity = (name) => {
        const target = normalize(name);
        if (!target) return null;
        return cities.find((c) => normalize(c.name) === target || normalize(c.slug) === target);
    };

    const resetPicker = () => {
        setFileName("");
        setRows(null);
        setUnmatchedCities([]);
        setInvalidCount(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setResult(null);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

            const matched = [];
            const unmatchedSet = new Set();
            let invalid = 0;

            rawRows.forEach((row) => {
                const fields = {};
                Object.entries(row).forEach(([key, value]) => {
                    const field = HEADER_ALIASES[normalize(key)];
                    if (field) fields[field] = typeof value === "string" ? value.trim() : value;
                });

                if (!fields.qyteti && !fields.dosja && !fields.objekti) return; // blank row

                const city = findCity(fields.qyteti);
                if (!city) {
                    unmatchedSet.add(fields.qyteti || "(bosh)");
                    return;
                }

                const isValid =
                    fields.dosja && fields.objekti && fields.tipi && fields.fondi &&
                    isCoordinate(fields.lat) && isCoordinate(fields.lon);

                if (!isValid) {
                    invalid += 1;
                    return;
                }

                matched.push({
                    cityId: city.id,
                    dosja: String(fields.dosja),
                    objekti: String(fields.objekti),
                    tipiRaw: String(fields.tipi),
                    fondi: String(fields.fondi),
                    lat: parseFloat(fields.lat),
                    lon: parseFloat(fields.lon),
                    dataHapjes: fields.dataHapjes ? String(fields.dataHapjes) : null,
                    dataMbylljes: fields.dataMbylljes ? String(fields.dataMbylljes) : null,
                });
            });

            setRows(matched);
            setUnmatchedCities([...unmatchedSet]);
            setInvalidCount(invalid);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleImport = async () => {
        if (!rows || rows.length === 0) return;
        setImporting(true);
        try {
            await create_sites_bulk_service(rows);
            setResult({ success: true, count: rows.length });
            resetPicker();
        } catch (error) {
            setResult({ success: false, message: error.response?.data?.message || "Importi dështoi" });
        } finally {
            setImporting(false);
        }
    };

    const downloadTemplate = () => {
        const sample = [{
            Qyteti: cities[0]?.name || "Tiranë",
            Dosja: "ORV nr.1",
            Objekti: "Shembull objekti",
            Tipi: "Industrial",
            Fondi: "DPB Tiranë",
            Lat: 41.3275,
            Lon: 19.8187,
            "Data Hapjes": "01.01.1975",
            "Data Mbylljes": "01.01.1990",
        }];
        const worksheet = XLSX.utils.json_to_sheet(sample);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Objekte");
        XLSX.writeFile(workbook, "shabllon-import.xlsx");
    };

    return (
        <section className="admin-section">
            <div className="admin-section-header">
                <h2>Importo objekte nga Excel</h2>
                <button type="button" className="admin-btn admin-btn-outline" onClick={downloadTemplate}>
                    Shkarko shabllonin
                </button>
            </div>

            <p className="admin-import-hint">
                Kolonat e pranuara: <strong>Qyteti, Dosja, Objekti, Tipi, Fondi, Lat, Lon</strong>, dhe opsionalisht{" "}
                <strong>Data Hapjes, Data Mbylljes</strong>. Vlera te "Qyteti" duhet të përputhet me emrin e një qyteti
                ekzistues — çdo rresht shkon vetë te qyteti i tij.
            </p>

            <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} />

            {fileName && rows !== null && (
                <div className="admin-import-summary">
                    <div>Skedari: <strong>{fileName}</strong></div>
                    <div className="admin-import-summary-ok">{rows.length} rreshta gati për import</div>

                    {invalidCount > 0 && (
                        <div className="admin-import-summary-warn">
                            {invalidCount} rreshta me të dhëna të pavlefshme (u anashkaluan)
                        </div>
                    )}

                    {unmatchedCities.length > 0 && (
                        <div className="admin-import-summary-warn">
                            Qytete të panjohura (u anashkaluan): {unmatchedCities.join(", ")}
                        </div>
                    )}

                    <div className="admin-form-actions">
                        <button
                            type="button"
                            className="admin-btn admin-btn-primary"
                            onClick={handleImport}
                            disabled={rows.length === 0 || importing}
                        >
                            {importing ? "Duke importuar..." : `Importo ${rows.length} rreshta`}
                        </button>
                        <button type="button" className="admin-btn admin-btn-outline" onClick={resetPicker}>
                            Anulo
                        </button>
                    </div>
                </div>
            )}

            {result?.success && (
                <div className="admin-import-success">U importuan {result.count} objekte me sukses.</div>
            )}
            {result && !result.success && (
                <div className="admin-import-error">{result.message}</div>
            )}
        </section>
    );
};

export default ExcelImport;

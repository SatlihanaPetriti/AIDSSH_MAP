export const TYPES = {
    // Muted palette; spelling variants of the same type share one color.
    Artistik: { color: '#B7791F', label: 'Artistik' },
    Industrial: { color: '#8C3B3B', label: 'Industrial' },
    Industriale: { color: '#8C3B3B', label: 'Industriale' },
    Industri: { color: '#8C3B3B', label: 'Industri' },
    Ekonomik: { color: '#2F6F8F', label: 'Ekonomik' },
    Ushtarak: { color: '#4F5B4A', label: 'Ushtarak' },
    Historik: { color: '#7A5C8A', label: 'Historik' },
    Arsimor: { color: '#3C5A99', label: 'Arsimor' },
    Arsimore: { color: '#3C5A99', label: 'Arsimore' },
    Kulturor: { color: '#A0522D', label: 'Kulturor' },
    Administrativ: { color: '#7B6D5A', label: 'Administrativ' },
    Buqësor: { color: '#5E8040', label: 'Buqësor' },
    Bujqësor: { color: '#5E8040', label: 'Bujqësor' },
    Teknologji: { color: '#2A8C8C', label: 'Teknologji' },
    Politik: { color: '#44505C', label: 'Politik' },
    Studimore: { color: '#9A6B7E', label: 'Studimore' },
    Teknologjik: { color: '#2A8C8C', label: 'Teknologjik' },
    'Trup Diplomatik': { color: '#6F7F8C', label: 'Trup Diplomatik' },
};

export const CATEGORY_SPLIT = {
    'Politiko-Historik': ['Politik', 'Historik'],
    'Politiko-Kulturor': ['Politik', 'Kulturor'],
    'Politiko-Ushtarak': ['Politik', 'Ushtarak'],
    'Ekonomiko-Teknologjik': ['Ekonomik', 'Teknologjik'],
    'Kulturoro-Artistik': ['Kulturor', 'Artistik'],
    'Arsimor-Bujqësor': ['Arsimor', 'Bujqësor'],
    'Historiko-Artistik': ['Historik', 'Artistik'],
    'Studimor-Industrial': ['Studimore', 'Industrial'],
    'Ekonomiko-Studimore': ['Ekonomik', 'Studimore'],
    'Trup Diplomatik dhe ekonomik': ['Trup Diplomatik', 'Ekonomik'],
};

const DEFAULT_TYPE_CONFIG = { color: '#8A6A3D', label: 'Pa kategori' };

export const getCategories = (tipiRaw) => CATEGORY_SPLIT[tipiRaw] || [tipiRaw];

// A stable color for any type string not in the curated TYPES palette above —
// so a brand-new "Tipi" entered for another qytet still gets its own
// distinct, consistent color instead of everyone sharing one gray fallback.
// Returned as hex (not hsl()) since callers append alpha suffixes like
// `${color}1c` to it for popup/legend backgrounds.
const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (n) => Math.round(f(n) * 255).toString(16).padStart(2, '0');
    return `#${toHex(0)}${toHex(8)}${toHex(4)}`;
};

const hashColor = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return hslToHex(hue, 55, 38);
};

export const getTypeConfig = (type) => {
    if (!type) return DEFAULT_TYPE_CONFIG;
    return TYPES[type] || { color: hashColor(type), label: type };
};

export const EXECUTION_FADE_STOPS = [
    { f: 1.0, opacity: 0.05 },
    { f: 0.82, opacity: 0.08 },
    { f: 0.64, opacity: 0.12 },
    { f: 0.5, opacity: 0.16 },
    { f: 0.36, opacity: 0.22 },
    { f: 0.25, opacity: 0.3 },
    { f: 0.16, opacity: 0.4 },
];

export const EXECUTION_GROUPS = [
    { type: 'ekzekutim_varrim', label: 'Vend ekzekutimi & varrimi' },
    { type: 'ekzekutim', label: 'Vend ekzekutimi' },
    { type: 'varrim', label: 'Vend varrimi' },
];

export const EXECUTION_NOTE = 'Zonat janë mbledhur sipas dëshmive nga persona të mbijetuar, shoqata të ish të përndjekurve politikë, ish-funksionarë të regjimit dhe familjarë të viktimave, si vende të dyshuara ekzekutimi/varrimi gjatë periudhës së diktaturës në Tiranë.';

// Parse a messy Albanian date string → year integer or null
export const parseYear = (str) => {
    if (!str) return null;
    const m = str.match(/\b(1[89]\d{2})\b/);
    if (m) return parseInt(m[1], 10);
    const m2 = str.match(/\b(\d{2})\b/);
    if (m2) return 1900 + parseInt(m2[1], 10);
    return null;
};

// Returns true if the site was active (open) at any point within [start, end]
export const isActiveInPeriod = (site, start, end) => {
    const opened = parseYear(site.dataHapjes);
    if (!opened) return false;
    const closed = parseYear(site.dataMbylljes);
    const closedYear = closed || 9999;
    return opened <= end && closedYear >= start;
};

export const TYPES = {
    Artistik: { color: '#F5821F', label: 'Artistik' },
    Industrial: { color: '#89191C', label: 'Industrial' },
    Industriale: { color: '#6E2328', label: 'Industriale' },
    Industri: { color: '#A33438', label: 'Industri' },
    Ekonomik: { color: '#1C809D', label: 'Ekonomik' },
    Ushtarak: { color: '#4A4636', label: 'Ushtarak' },
    Historik: { color: '#7A3B5E', label: 'Historik' },
    Arsimor: { color: '#2C5C8A', label: 'Arsimor' },
    Arsimore: { color: '#3D6FA8', label: 'Arsimore' },
    Kulturor: { color: '#C1571A', label: 'Kulturor' },
    Administrativ: { color: '#8A6A3D', label: 'Administrativ' },
    Buqësor: { color: '#5B7B3C', label: 'Buqësor' },
    Bujqësor: { color: '#7A9B4E', label: 'Bujqësor' },
    Teknologji: { color: '#3FA8BD', label: 'Teknologji' },
    Politik: { color: '#5E1216', label: 'Politik' },
    Studimore: { color: '#8064A0', label: 'Studimore' },
    Teknologjik: { color: '#1F9CB5', label: 'Teknologjik' },
    'Trup Diplomatik': { color: '#B0793D', label: 'Trup Diplomatik' },
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

export const getTypeConfig = (type) => {
    if (!type) return DEFAULT_TYPE_CONFIG;
    return TYPES[type] || { ...DEFAULT_TYPE_CONFIG, label: type };
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

export const ERA_RANGES = {
    '1969': [1969, 1979],
    '1980': [1980, 1991],
};

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

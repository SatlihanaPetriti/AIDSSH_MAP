import { createContext, useContext, useState, useMemo, useRef, useCallback } from "react";
import { useSitesContext } from "./SitesContext";
import { getCategories, getTypeConfig, ERA_RANGES, isActiveInPeriod } from "../db/typeConfig";

const MARKER_ZOOM = 15;

// Context global
const MapUIContext = createContext({});

// Provider
const MapUIProvider = (props) => {
    const { sites } = useSitesContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const [selectedFondi, setSelectedFondi] = useState(null);
    const [selectedEra, setSelectedEra] = useState(null);
    const [labelsVisible, setLabelsVisible] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSiteId, setActiveSiteId] = useState(null);
    const [toast, setToast] = useState({ message: "", visible: false });

    const mapRef = useRef(null);
    const markerRefs = useRef({});
    const toastTimer = useRef(null);

    const setMapInstance = (map) => {
        mapRef.current = map;
    };

    const registerMarker = (siteId, marker) => {
        if (marker) {
            markerRefs.current[siteId] = marker;
        } else {
            delete markerRefs.current[siteId];
        }
    };

    const showToast = useCallback((message) => {
        clearTimeout(toastTimer.current);
        setToast({ message, visible: true });
        toastTimer.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 2500);
    }, []);

    const selectType = (type) => {
        setSelectedType(type);
    };

    const toggleFondiFilter = (fondi) => {
        setSelectedFondi((prev) => (prev === fondi ? null : fondi));
    };

    const toggleEraFilter = (era) => {
        setSelectedEra((prev) => (prev === era ? null : era));
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedType(null);
        setSelectedFondi(null);
        setSelectedEra(null);
        showToast("Të gjitha tipet u shfaqën");
    };

    const toggleLabels = () => {
        setLabelsVisible((prev) => {
            const next = !prev;
            showToast(next ? "Emrat u shfaqën" : "Emrat u fshehën");
            return next;
        });
    };

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
        setTimeout(() => {
            mapRef.current?.invalidateSize();
        }, 320);
    };

    const filteredSites = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return sites.filter((site) => {
            const categories = getCategories(site.tipiRaw);
            const matchesType = !selectedType || categories.includes(selectedType);
            const matchesFondi = !selectedFondi || site.fondi === selectedFondi;
            const matchesSearch =
                !query ||
                site.objekti.toLowerCase().includes(query) ||
                site.dosja.toLowerCase().includes(query) ||
                site.tipiRaw.toLowerCase().includes(query);
            const matchesEra = !selectedEra || isActiveInPeriod(site, ...ERA_RANGES[selectedEra]);

            return matchesType && matchesFondi && matchesSearch && matchesEra;
        });
    }, [sites, searchQuery, selectedType, selectedFondi, selectedEra]);

    const typeCounts = useMemo(() => {
        return sites.reduce((counts, site) => {
            getCategories(site.tipiRaw).forEach((category) => {
                counts[category] = (counts[category] || 0) + 1;
            });
            return counts;
        }, {});
    }, [sites]);

    // Built from whatever "Tipi" values actually appear in this city's data —
    // not a fixed list — so a new tipiRaw entered in admin shows up here and
    // in the legend/filter automatically, with its own stable color.
    const typeList = useMemo(() => {
        return Object.entries(typeCounts)
            .map(([type, count]) => ({ type, count, ...getTypeConfig(type) }))
            .sort((a, b) => b.count - a.count);
    }, [typeCounts]);

    const fondiList = useMemo(() => {
        const counts = sites.reduce((acc, site) => {
            if (site.fondi) acc[site.fondi] = (acc[site.fondi] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts)
            .map(([fondi, count]) => ({ fondi, count }))
            .sort((a, b) => b.count - a.count);
    }, [sites]);

    const highlightListItem = (siteId) => {
        setActiveSiteId(siteId);
        document.getElementById(`list-item-${siteId}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };

    const focusSite = (site) => {
        mapRef.current?.flyTo([site.lat, site.lon], MARKER_ZOOM, {
            duration: 1.2,
            easeLinearity: 0.25,
        });

        setTimeout(() => {
            markerRefs.current[site.id]?.closeTooltip();
            markerRefs.current[site.id]?.openPopup();
        }, 1300);

        highlightListItem(site.id);
    };

    const values = {
        searchQuery,
        setSearchQuery,
        selectedType,
        selectType,
        selectedFondi,
        toggleFondiFilter,
        selectedEra,
        toggleEraFilter,
        clearFilters,
        labelsVisible,
        toggleLabels,
        sidebarCollapsed,
        toggleSidebar,
        activeSiteId,
        highlightListItem,
        toast,
        showToast,
        filteredSites,
        typeCounts,
        typeList,
        fondiList,
        focusSite,
        setMapInstance,
        registerMarker,
    };

    return (
        <MapUIContext.Provider value={values}>
            {props.children}
        </MapUIContext.Provider>
    );
};

const useMapUIContext = () => useContext(MapUIContext);

export { MapUIProvider, useMapUIContext };

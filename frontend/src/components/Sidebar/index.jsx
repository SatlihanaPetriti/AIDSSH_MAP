import { useEffect, useRef, useState } from "react";
import { useMapUIContext } from "../../Context/MapUIContext";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import { getTypeConfig, getCategories } from "../../db/typeConfig";
import "./index.css";

const Sidebar = () => {
    const {
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
        focusSite,
        filteredSites,
        typeList,
        fondiList,
    } = useMapUIContext();

    const { showExecutionLayer, toggleExecutionLayer } = useExecutionSitesContext();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!dropdownOpen) return;
        const handleOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [dropdownOpen]);

    const dropdownConfig = getTypeConfig(selectedType);

    return (
        <>
            <button
                id="sidebar-toggle"
                type="button"
                className={sidebarCollapsed ? "collapsed" : ""}
                title="Fshih/Shfaq panelin"
                aria-label="Fshih ose shfaq panelin anësor"
                onClick={toggleSidebar}
            >
                <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d={sidebarCollapsed ? "M5 2l5 5-5 5" : "M9 2L4 7l5 5"}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <aside id="sidebar" className={sidebarCollapsed ? "collapsed" : ""}>
                <div className="sidebar-search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Kërko objekt, dosje..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="results-bar">
                    <span>Duke shfaqur <strong>{filteredSites.length}</strong> objekte</span>
                    <button className="clear-btn" type="button" onClick={clearFilters}>
                        Fshi filtrat
                    </button>
                </div>

                <div className="sidebar-filters">
                    <div className="filter-label filter-label-spaced">Emrat e objekteve</div>
                    <div className="filter-row">
                        <button className="label-toggle-btn" type="button" onClick={toggleLabels}>
                            <span className={`label-toggle-track ${labelsVisible ? "on" : ""}`}>
                                <span className={`label-toggle-thumb ${labelsVisible ? "on" : ""}`} />
                            </span>
                            <span>{labelsVisible ? "ON" : "OFF"}</span>
                        </button>
                    </div>

                    <div className="filter-label filter-label-spaced">Filtro sipas periudhës</div>
                    <div className="filter-row" style={{ gap: 6 }}>
                        <button
                            className={`era-btn ${selectedEra === "1969" ? "active" : ""}`}
                            type="button"
                            onClick={() => toggleEraFilter("1969")}
                        >
                            1969–1979
                        </button>
                        <button
                            className={`era-btn ${selectedEra === "1980" ? "active" : ""}`}
                            type="button"
                            onClick={() => toggleEraFilter("1980")}
                        >
                            1980–1991
                        </button>
                    </div>

                    {fondiList.length > 1 && (
                        <>
                            <div className="filter-label filter-label-spaced">Filtro sipas fondit</div>
                            <div className="filter-row" style={{ flexWrap: "wrap" }}>
                                {fondiList.map(({ fondi, count }) => (
                                    <button
                                        key={fondi}
                                        className={`fondi-btn ${selectedFondi === fondi ? "active" : ""}`}
                                        type="button"
                                        onClick={() => toggleFondiFilter(fondi)}
                                    >
                                        {fondi} ({count})
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="filter-label">Filtro sipas tipit</div>
                    <div className="filter-row">
                        <div className="dropdown-wrap" ref={dropdownRef}>
                            <button
                                className="dropdown-btn"
                                type="button"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                <span
                                    className="dropdown-dot"
                                    style={
                                        selectedType
                                            ? { background: dropdownConfig.color, border: "none" }
                                            : { background: "transparent", border: "1.5px solid #A89A88" }
                                    }
                                />
                                <span style={{ flex: 1 }}>{selectedType ? dropdownConfig.label : "Të gjitha tipet"}</span>
                                <svg
                                    className="dropdown-arrow"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    style={{ transform: dropdownOpen ? "rotate(180deg)" : "" }}
                                >
                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                                {typeList.map(({ type, color, label, count }) => (
                                    <div
                                        key={type}
                                        className={`dropdown-item ${selectedType === type ? "selected" : ""}`}
                                        onClick={() => {
                                            selectType(type);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        <span className="dropdown-item-dot" style={{ background: color }} />
                                        {label}
                                        <span className="dropdown-item-count">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="show-all-btn" type="button" title="Shfaq të gjitha" onClick={clearFilters}>
                            Të gjitha
                        </button>
                    </div>

                    <div className="filter-label filter-label-spaced">Shtresë: Vendet e ekzekutimit/varrimit</div>
                    <div className="filter-row">
                        <button className="label-toggle-btn" type="button" onClick={toggleExecutionLayer}>
                            <span className={`label-toggle-track ${showExecutionLayer ? "on" : ""}`}>
                                <span className={`label-toggle-thumb ${showExecutionLayer ? "on" : ""}`} />
                            </span>
                            <span>{showExecutionLayer ? "ON" : "OFF"}</span>
                        </button>
                    </div>
                </div>

                <div className="sidebar-list">
                    {filteredSites.map((site) => {
                        const primaryCategory = getCategories(site.tipiRaw)[0];
                        const config = getTypeConfig(primaryCategory);

                        return (
                            <div
                                key={site.id}
                                id={`list-item-${site.id}`}
                                className={`list-item ${activeSiteId === site.id ? "active" : ""}`}
                                onClick={() => focusSite(site)}
                            >
                                <div className="list-item-dot" style={{ background: config.color }} />
                                <div className="list-item-body">
                                    <div className="list-item-name">{site.objekti}</div>
                                    <div className="list-item-meta">
                                        <div className="list-item-type" style={{ background: `${config.color}22`, color: config.color }}>
                                            {site.tipiRaw}
                                        </div>
                                        <span>{site.dosja}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

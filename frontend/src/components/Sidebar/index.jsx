import { useEffect, useRef, useState } from "react";
import { useMapUIContext } from "../../Context/MapUIContext";
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
        eras,
        selectedEraId,
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
    const hasActiveFilters = Boolean(searchQuery || selectedType || selectedFondi || selectedEraId);

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
                        placeholder="Kërko objekt ose dosje"
                        aria-label="Kërko objekt ose dosje"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="sidebar-filters">
                    <div className="filter-group">
                        <label className="filter-label" htmlFor="type-filter">Tipi</label>
                        <div className="dropdown-wrap" ref={dropdownRef}>
                            <button
                                id="type-filter"
                                className="dropdown-btn"
                                type="button"
                                aria-haspopup="listbox"
                                aria-expanded={dropdownOpen}
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                {selectedType && (
                                    <span className="dropdown-dot" style={{ background: dropdownConfig.color }} />
                                )}
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

                            <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`} role="listbox">
                                {typeList.map(({ type, color, label, count }) => (
                                    <div
                                        key={type}
                                        role="option"
                                        aria-selected={selectedType === type}
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
                    </div>

                    {eras.length > 0 && (
                        <div className="filter-group">
                            <div className="filter-label">Periudha</div>
                            <div className="chip-row">
                                {eras.map((era) => (
                                    <button
                                        key={era.id}
                                        className={`chip ${selectedEraId === era.id ? "active" : ""}`}
                                        type="button"
                                        aria-pressed={selectedEraId === era.id}
                                        onClick={() => toggleEraFilter(era.id)}
                                    >
                                        {era.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {fondiList.length > 1 && (
                        <div className="filter-group">
                            <div className="filter-label">Fondi</div>
                            <div className="chip-row">
                                {fondiList.map(({ fondi, count }) => (
                                    <button
                                        key={fondi}
                                        className={`chip ${selectedFondi === fondi ? "active" : ""}`}
                                        type="button"
                                        aria-pressed={selectedFondi === fondi}
                                        onClick={() => toggleFondiFilter(fondi)}
                                    >
                                        {fondi} ({count})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <label className="check-row">
                        <input type="checkbox" checked={labelsVisible} onChange={toggleLabels} />
                        <span>Shfaq emrat e objekteve në hartë</span>
                    </label>
                </div>

                <div className="results-bar">
                    <span><strong>{filteredSites.length}</strong> objekte</span>
                    {hasActiveFilters && (
                        <button className="clear-btn" type="button" onClick={clearFilters}>
                            Pastro filtrat
                        </button>
                    )}
                </div>

                <div className="sidebar-list">
                    {filteredSites.length === 0 && (
                        <div className="list-empty">Asnjë objekt nuk përputhet me kërkimin.</div>
                    )}
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
                                        <span>{site.tipiRaw}</span>
                                        {site.dosja && <span>· {site.dosja}</span>}
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

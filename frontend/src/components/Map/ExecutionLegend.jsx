import { useState } from "react";
import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import { EXECUTION_GROUPS, EXECUTION_NOTE } from "../../db/typeConfig";

const ExecutionLegend = () => {
    const { executionSites, showExecutionLayer } = useExecutionSitesContext();
    const [open, setOpen] = useState(() => !window.matchMedia("(max-width: 768px)").matches);

    return (
        <div className={`execution-legend ${showExecutionLayer ? "show" : ""} ${open ? "" : "closed"}`}>
            <button
                type="button"
                className="legend-header"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className="legend-title">Zona të dyshuara</span>
                <svg
                    className="legend-chevron"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    style={{ transform: open ? "rotate(180deg)" : "" }}
                >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div className="legend-body">
                    {EXECUTION_GROUPS.map(({ type, label }) => {
                        const groupSites = executionSites.filter((site) => site.type === type);
                        if (!groupSites.length) return null;

                        return (
                            <div key={type}>
                                <div className="execution-legend-group-label">{label}</div>
                                {groupSites.map((site) => (
                                    <div key={site.id} className="execution-legend-item">
                                        <span className="execution-legend-dot" style={{ background: site.color }} />
                                        {site.name}
                                    </div>
                                ))}
                            </div>
                        );
                    })}

                    <div className="execution-legend-note">{EXECUTION_NOTE}</div>
                </div>
            )}
        </div>
    );
};

export default ExecutionLegend;

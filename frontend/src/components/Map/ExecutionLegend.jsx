import { useExecutionSitesContext } from "../../Context/ExecutionSitesContext";
import { EXECUTION_GROUPS, EXECUTION_NOTE } from "../../db/typeConfig";

const ExecutionLegend = () => {
    const { executionSites, showExecutionLayer } = useExecutionSitesContext();

    return (
        <div className={`execution-legend ${showExecutionLayer ? "show" : ""}`}>
            <div className="legend-title">Zona të Dyshuara</div>

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
    );
};

export default ExecutionLegend;

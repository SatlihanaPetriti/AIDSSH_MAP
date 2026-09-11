const CollapsibleSection = ({ title, count, actions, open, onToggle, children }) => {
    return (
        <section className="admin-section">
            <div className="admin-section-header">
                <button type="button" className="admin-collapse-toggle" onClick={onToggle}>
                    <svg
                        className={`admin-collapse-chevron ${open ? "open" : ""}`}
                        width="12" height="12" viewBox="0 0 12 12"
                    >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2>{title}{count !== undefined ? ` (${count})` : ""}</h2>
                </button>

                <div className="admin-section-actions">{actions}</div>
            </div>

            {open && children}
        </section>
    );
};

export default CollapsibleSection;

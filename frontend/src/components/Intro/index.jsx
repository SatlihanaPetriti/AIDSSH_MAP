import { useState } from "react";
import logo from "../../assets/logo.svg";
import "./index.css";

const Intro = ({ onEnter }) => {
    const [exiting, setExiting] = useState(false);

    const handleEnter = () => {
        if (exiting) return;
        setExiting(true);
        setTimeout(onEnter, 550);
    };

    return (
        <section
            id="intro"
            className={exiting ? "exit" : ""}
            onClick={handleEnter}
            aria-label="Hyrje në hartë"
        >
            <div className={`intro-rule-top ${exiting ? "flash" : ""}`} />
            <div className={`intro-rule-bottom ${exiting ? "flash" : ""}`} />

            <div className={`intro-rings ${exiting ? "burst" : ""}`}>
                <span />
                <span />
                <span />
            </div>

            <div className={`intro-content ${exiting ? "fading" : ""}`}>
                <div className="logo-wrapper">
                    <img src={logo} alt="AIDSSH" className="intro-logo-img" />
                </div>

                <div className="intro-hint">
                    <span>Kliko për të hyrë</span>
                    <span className="chevron" />
                </div>
            </div>
        </section>
    );
};

export default Intro;

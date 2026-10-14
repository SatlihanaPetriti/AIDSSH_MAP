import { useState } from "react";
import logo from "../../assets/logo.svg";
import "./index.css";

const Intro = ({ onEnter }) => {
    const [exiting, setExiting] = useState(false);

    const handleEnter = () => {
        if (exiting) return;
        setExiting(true);
        setTimeout(onEnter, 400);
    };

    return (
        <section
            id="intro"
            className={exiting ? "exit" : ""}
            onClick={handleEnter}
            aria-label="Hyrje në hartë"
        >
            <div className={`intro-content ${exiting ? "fading" : ""}`}>
                <img src={logo} alt="AIDSSH" className="intro-logo-img" />
                <h1 className="intro-title">Harta e Dosjeve ORV</h1>
                <button type="button" className="intro-enter">Hyr në hartë</button>
            </div>
        </section>
    );
};

export default Intro;

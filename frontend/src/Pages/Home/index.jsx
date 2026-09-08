import { useState } from "react";
import { Link } from "react-router-dom";
import { useCitiesContext } from "../../Context/CitiesContext";
import Intro from "../../components/Intro";
import logo from "../../assets/logo.svg";
import "./index.css";

const Home = () => {
    const [entered, setEntered] = useState(false);
    const { cities, loading } = useCitiesContext();

    if (!entered) {
        return <Intro onEnter={() => setEntered(true)} />;
    }

    return (
        <div id="picker">
            <header id="picker-header">
                <img src={logo} alt="AIDSSH" className="picker-logo" />
                <h1>Autoriteti për Informimin mbi Dokumentet e ish-Sigurimit të Shtetit</h1>
                <p>Zgjidh një qytet për të parë hartën e dosjeve ORV</p>
            </header>

            <main id="picker-grid">
                {loading && <div className="picker-status">Duke ngarkuar qytetet...</div>}

                {!loading && cities.length === 0 && (
                    <div className="picker-status">Ende nuk ka asnjë qytet të shtuar.</div>
                )}

                {cities.map((city) => (
                    <Link key={city.id} to={`/harta/${city.slug}`} className="city-card">
                        <div className="city-card-name">{city.name}</div>
                        {city.subtitle && <div className="city-card-subtitle">{city.subtitle}</div>}
                        <div className="city-card-cta">Shiko hartën →</div>
                    </Link>
                ))}
            </main>
        </div>
    );
};

export default Home;

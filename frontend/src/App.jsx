import { useEffect, useState } from "react";
import { SitesProvider } from "./Context/SitesContext";
import { ExecutionSitesProvider } from "./Context/ExecutionSitesContext";
import { MapUIProvider, useMapUIContext } from "./Context/MapUIContext";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import Toast from "./components/Toast";

function AppShell({ entered, onEnter }) {
    const { refreshMapSize } = useMapUIContext();

    // The map is mounted behind the intro screen (#app is display:none),
    // so Leaflet measures a 0x0 container. Once #app becomes visible, tell
    // it to re-measure so it actually loads tiles for the real viewport.
    useEffect(() => {
        if (!entered) return;
        const id = requestAnimationFrame(() => refreshMapSize());
        return () => cancelAnimationFrame(id);
    }, [entered]);

    return (
        <>
            {!entered && <Intro onEnter={onEnter} />}

            <div id="app" className={entered ? "visible shown" : ""}>
                <Header />
                <main id="main">
                    <Sidebar />
                    <Map />
                </main>
            </div>

            <Toast />
        </>
    );
}

function App() {
    const [entered, setEntered] = useState(false);

    return (
        <SitesProvider>
            <ExecutionSitesProvider>
                <MapUIProvider>
                    <AppShell entered={entered} onEnter={() => setEntered(true)} />
                </MapUIProvider>
            </ExecutionSitesProvider>
        </SitesProvider>
    );
}

export default App;

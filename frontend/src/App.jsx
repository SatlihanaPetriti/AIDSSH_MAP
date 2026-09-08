import { useState } from "react";
import { SitesProvider } from "./Context/SitesContext";
import { ExecutionSitesProvider } from "./Context/ExecutionSitesContext";
import { MapUIProvider } from "./Context/MapUIContext";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import Toast from "./components/Toast";

function App() {
    const [entered, setEntered] = useState(false);

    return (
        <SitesProvider>
            <ExecutionSitesProvider>
                <MapUIProvider>
                    {!entered && <Intro onEnter={() => setEntered(true)} />}

                    <div id="app" className={entered ? "visible shown" : ""}>
                        <Header />
                        <main id="main">
                            <Sidebar />
                            <Map />
                        </main>
                    </div>

                    <Toast />
                </MapUIProvider>
            </ExecutionSitesProvider>
        </SitesProvider>
    );
}

export default App;

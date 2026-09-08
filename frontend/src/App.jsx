import { SitesProvider } from "./Context/SitesContext";
import { ExecutionSitesProvider } from "./Context/ExecutionSitesContext";
import Header from "./components/Header";
import Map from "./components/Map";

function App() {
    return (
        <SitesProvider>
            <ExecutionSitesProvider>
                <div id="app">
                    <Header />
                    <Map />
                </div>
            </ExecutionSitesProvider>
        </SitesProvider>
    );
}

export default App;

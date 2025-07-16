// import FlightsPage from "./components/pages/flightsPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./components/pages/home";
import ButtonAppBar from "./components/appBar";
import HeavyPage from "./components/pages/heavyPAge";
// import CarsPage from "./components/pages/carsPage";
// import FactoryPage from "./components/pages/factoriesPage";
const LazyFactoryPage = lazy(() => import("./components/pages/factoriesPage"));
const LazyCarsPage = lazy(() => import("./components/pages/carsPage"));
const LazyFlightsPage = lazy(() => import("./components/pages/flightsPage"));

function App() {
    return (
        <>
            <div>
                <ButtonAppBar />
                <Suspense fallback={<div>Still Loading Page...</div>}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        {/* 2 */}
                        <Route path="/flights" element={<LazyFlightsPage />} />
                        {/* 3 */}
                        <Route path="/cars" element={<LazyCarsPage />} />
                        {/* 1 */}
                        <Route path="/factories" element={<LazyFactoryPage />} />
                        <Route path="/heavy" element={<HeavyPage />} />
                    </Routes>
                </Suspense>
            </div>
        </>
    );
}

export default App;

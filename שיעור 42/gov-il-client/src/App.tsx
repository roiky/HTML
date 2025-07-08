import { useState } from "react";
import FlightsPage from "./components/pages/flightsPage";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/home";
import ButtonAppBar from "./components/appBar";
import CarsPage from "./components/pages/searchCar";
function App() {
    return (
        <>
            <div>
                <ButtonAppBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/flights" element={<FlightsPage />} />
                    <Route path="/cars" element={<CarsPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;

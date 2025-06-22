import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Navbar/Footer";
import Routing from "./components/Routing/Routing";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />

                <Routing />

                <Footer version="1.0.0" />
            </BrowserRouter>
        </>
    );
}

export default App;

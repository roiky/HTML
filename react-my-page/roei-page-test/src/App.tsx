import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Navbar/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
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

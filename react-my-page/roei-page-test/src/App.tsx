import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Navbar/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>

                <Footer version="0.1" />
            </BrowserRouter>
        </>
    );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Data from "./pages/Lecturers";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Display404 from "./components/404";
import VacationsPage from "./pages/VacationsPage";

export default function App() {
    return (
        <div className="app">
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/vacations" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/vacations" element={<VacationsPage />} />
                    <Route path="*" element={<Display404 />} />
                </Routes>
            </main>
        </div>
    );
}

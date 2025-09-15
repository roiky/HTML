import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Data from "./pages/Lecturers";
import ProtectedRoute from "./components/ProtectedRoute";
import Lecturers from "./pages/Lecturers";

export default function App() {
    return (
        <div className="app">
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/lecturers" replace />} />
                    <Route path="/lecturers" element={<Lecturers />} />
                    <Route
                        path="*"
                        element={
                            <div className="card">
                                <h2>Not Found</h2>
                            </div>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { Cars } from "../../CarArea/Cars/Cars";
import { About } from "../../Pages/About/About";
import { Home } from "../../Pages/Home/Home";
import { Sales } from "../../Pages/Sales/Sales";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";
import LoginPage from "../Login";
import RegisterPage from "../Register";

export function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<AmIAuthenticate />} />
                <Route path="/home" element={<ThisIsNewComponent />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

function ThisIsNewComponent() {
    return (
        <div>
            <h1>Home</h1>
            <h2> Home page please visit us on: URL </h2>
        </div>
    );
}

function AmIAuthenticate() {
    if (localStorage.getItem("isAuthenticate")) {
        return <Navigate to="/home" />;
    } else {
        return <Navigate to="/login" />;
    }
}

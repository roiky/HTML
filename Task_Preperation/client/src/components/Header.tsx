import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    // const authed = isAuthenticated();

    return (
        <header className="header">
            <div className="brand">
                <span className="accent">Lecturers List</span>
            </div>
            <nav className="nav">
                {/* <Link className={location.pathname === "/data" ? "active" : ""} to="/data">
                    Data
                </Link> */}
            </nav>
            <div className="actions"></div>
        </header>
    );
}

import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/navbar_icon.png";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    // const authed = isAuthenticated();

    return (
        <header className="header">
            <div className="brand">
                <img style={{ width: "2%" }} src={icon}></img>
                <span className="accent">Vacations Site</span>
            </div>
            <nav className="nav">
                {/* <Link className={location.pathname === "/data" ? "active" : ""} to="/data" style={{}}>
                    Data
                </Link> */}
                <span>Roei Kalimi - Project3</span>
            </nav>
            <div className="actions"></div>
        </header>
    );
}

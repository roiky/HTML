import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/navbar_icon.png";
import { useAuth } from "../contex/AuthContext";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    // const authed = isAuthenticated();
    const { user, loading, logout } = useAuth();

    return (
        <header className="header">
            <div className="brand">
                <img style={{ width: "2%" }} src={icon}></img>
                <span className="accent">Vacations Site</span>
            </div>
            <nav className="nav">
                {loading ? (
                    "Loading..."
                ) : user ? (
                    <span>
                        <strong>
                            {user.first_name} {user.last_name}
                        </strong>

                        {user.role === "admin" && <span style={{ marginLeft: 10, color: "red" }}>[Admin]</span>}
                        {/* to add - onClick => navigate to admin panel! */}

                        <button style={{ marginLeft: 10 }} onClick={logout}>
                            Logout
                        </button>
                    </span>
                ) : (
                    <span>
                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </span>
                )}
            </nav>
            <div className="actions"></div>
        </header>
    );
}

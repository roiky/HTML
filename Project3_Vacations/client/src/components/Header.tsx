import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/navbar_icon.png";
import { useAuth } from "../contex/AuthContext";
import { Button } from "@mui/material";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    // const authed = isAuthenticated();
    const { user, loading, logout } = useAuth();

    return (
        <header className="header">
            <div className="brand" onClick={() => navigate("/vacations")}>
                <img style={{ width: "2%" }} src={icon}></img>
                <span className="accent">Vacations Site</span>
            </div>
            <nav className="nav">
                {loading ? (
                    "Loading..."
                ) : user ? (
                    <span>
                        <strong style={{ margin: 5 }}>
                            {user.first_name} {user.last_name}
                        </strong>

                        {user.role === "admin" && (
                            <Button size="small" variant="contained" color="success" onClick={() => navigate("/adminPage")}>
                                Go to Admin Panel
                            </Button>
                        )}

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

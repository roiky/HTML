import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.siteLogo}>
                <img src="https://cdn.simpleicons.org/solid?viewbox=auto" />
            </div>
            <div className={styles.siteName}>MySite</div>

            <div className={styles.marqueeWrapper}>
                <div className={styles.marquee}>💻 Welcome to Roei's React site! 🚀 Explore the world of code!</div>
            </div>

            <ul className={styles.navLinks}>
                <ul className={styles.navLinks}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </ul>
        </nav>
    );
}

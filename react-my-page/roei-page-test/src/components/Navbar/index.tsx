import styles from "./navbar.module.css";

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
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Projects</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </nav>
    );
}

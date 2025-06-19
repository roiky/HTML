import styles from "./navbar.module.css";

export default function Footer(props: { version: string }) {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <p>© {currentYear} [Roei Kalimi]. All rights reserved.</p>
            <p>Version: {props.version}</p>
        </footer>
    );
}

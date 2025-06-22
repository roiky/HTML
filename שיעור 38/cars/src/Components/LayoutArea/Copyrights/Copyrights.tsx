import "./Copyrights.css";

export function Copyrights(): JSX.Element {

    const year = new Date().getFullYear();

    return (
        <div className="Copyrights">
			<p>All Rights Reserved © {year}</p>
        </div>
    );
}

import { useState } from "react";
import css from "./buttonStyle.module.css";

export default function CreateButton(props: { text: string; img: string; url: string }) {
    const handleClick = () => {
        window.location.href = props.url;
    };
    const [counter, setCounter] = useState<number>(0);
    return (
        <div className={css.buttonDiv}>
            {/* <button className={css.customButton} onClick={handleClick}> */}
            <button className={css.customButton} onClick={() => setCounter(counter + 1)}>
                <img src={props.img} />
            </button>
            <span style={{ fontWeight: "bold" }}>
                {props.text} - {counter}
            </span>{" "}
        </div>
    );
}

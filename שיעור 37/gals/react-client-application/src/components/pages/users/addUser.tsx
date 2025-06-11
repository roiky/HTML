import { useState } from "react";

export default function AddUser(props: { handler: Function }) {
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    function clearForm() {
        setUserName("");
        setUserLastName("");
        setUserEmail("");
        setUserPhone("");
    }

    return (
        <div>
            <form>
                <input
                    value={userName}
                    placeholder="Name"
                    type="text"
                    onChange={(event) => {
                        setUserName(event.target.value);
                    }}
                ></input>
                <input
                    value={userLastName}
                    placeholder="Last Name"
                    type="text"
                    onChange={(event) => {
                        setUserLastName(event.target.value);
                    }}
                ></input>
                <input
                    value={userEmail}
                    placeholder="Email"
                    onChange={(event) => {
                        setUserEmail(event.target.value);
                    }}
                ></input>
                <input
                    value={userPhone}
                    placeholder="Phone"
                    type="text"
                    onChange={(event) => {
                        setUserPhone(event.target.value);
                        if (event.target.value.length !== 10) setPhoneError("Phone is invalid");
                        else setPhoneError("");
                    }}
                ></input>
                <span style={{ color: "red" }}>{phoneError} </span>
                <button
                    type="button"
                    onClick={() => {
                        if (!userName || !userLastName || !userEmail || !userPhone) return;
                        props.handler({ userName, userLastName, userEmail, userPhone });
                        clearForm();
                    }}
                >
                    Add
                </button>
            </form>
        </div>
    );
}

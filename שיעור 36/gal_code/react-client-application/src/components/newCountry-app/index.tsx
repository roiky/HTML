import { useState } from "react";

export default function NewCountryForm() {
    const [countryName, setCountryName] = useState("");
    const [countryFlag, setCountryFlag] = useState("");

    return (
        <div>
            <input
                onChange={(e) => {
                    setCountryName(e.target.value);
                }}
                type="text"
                placeholder="Country Name"
            ></input>

            <input
                onChange={(e) => {
                    setCountryFlag(e.target.value);
                }}
                type="text"
                placeholder="Country Flag"
            ></input>

            <button
                onClick={() => {
                    if (!countryFlag || !countryName) return;

                    handler({name: {common.}})
                }}
            >
                Insert Country
            </button>
        </div>
    );
}

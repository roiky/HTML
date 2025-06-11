import { useState } from "react"

export function AddCountry(props: { handler: any }) {
    const [countryName, setCountryName] = useState("")
    const [countryFlag, setCountryFlag] = useState("")



    return <div>
        <input onChange={(e) => { setCountryName(e.target.value) }} type="text" placeholder="Country Name" />
        <input onChange={(e) => { setCountryFlag(e.target.value) }} type="text" placeholder="Country Flag" />
        <button disabled={!countryFlag || !countryName} onClick={() => {

            if (!countryFlag || !countryName) return;

            props.handler({ name: { common: countryName }, flags: { svg: countryFlag } })
        }}>Add Country</button>
    </div>
}


import { useState } from "react"
import data from "../../../data/data.json"
import { CardApp } from "../../card"
import HeaderApp from "../../header-app"

export default function CountriesPage() {
    const [countryNameFilter, setCountryNameFilter] = useState<string>("")

    return <div>
        <HeaderApp title="countries - United" myColor="red" />
        <input  onChange={(e) => {
            setCountryNameFilter(e?.target.value)
        }} type="text" style={{ margin: "10px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }} >
            {data.filter(c => c?.name?.common.toLowerCase().includes(countryNameFilter.toLowerCase())).map(c => <CardApp key={c.name.common} title={c.name.common} image={c.flags.svg} />)}
        </div>
    </div>
}
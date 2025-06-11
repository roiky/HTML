import { useState } from "react"
import data from "../../../data/data.json"
import { CardApp } from "../../card"
import HeaderApp from "../../header-app"
import { AppTheme, getStyleByTheme, ThemeSettings } from "../../theme-app"
import { AddCountry } from "./add-country"



export default function CountriesPage() {
    const [countriesArray, setCountriesArray] = useState(data)
    const [countryNameFilter, setCountryNameFilter] = useState<string>("")
    const [theme, setTheme] = useState<AppTheme>(AppTheme.Light)

    function addCountryHandler(country: any) {
        setCountriesArray([...countriesArray, country])
    }



    return <div style={getStyleByTheme(theme)}>

        <ThemeSettings theme={theme} setTheme={setTheme} />
        <AddCountry handler={addCountryHandler} />
        <HeaderApp title="countries - United" myColor="red" />
        <input onChange={(e) => {
            setCountryNameFilter(e?.target.value)
        }} type="text" style={{ margin: "10px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }} >
            {countriesArray.filter(c => c?.name?.common.toLowerCase().includes(countryNameFilter.toLowerCase())).map(c => <CardApp key={c.name.common} title={c.name.common} image={c.flags.svg} />)}
        </div>
    </div>
}



// type TableColumn = {
//     field: string
//     headerName: string,
//     width: 150,
//     editable: false,
// },

import type { FlightClient } from "./service/getFlightsApi"

type ColumnType = {
    field: string,
    headerName: string,
    width: number,
    editable: boolean
}


export function extractColumnsFromData(singleObject: FlightClient): Array<ColumnType> {
    return Object.keys(singleObject).map(k => {
        if (k === "airlineCompany") return {
            field: k,
            headerName: k.toUpperCase(),
            width: 180,
            editable: true
        }
        else return {
            field: k,
            headerName: k.toUpperCase(),
            width: 90,
            editable: true
        }
    })

}
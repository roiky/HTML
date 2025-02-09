let tableHead = `  <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                    </thead>
                    `

let tableContent = `
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td id="markCell">Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>`

function init() {


}
function deleteTable() {
    const table = document.getElementById("table-data")
    if (table) {
        table.innerHTML = ""
    }
}

function loadTable() {
    const table = document.getElementById("table-data")
    if (table) {
        table.innerHTML = tableContent
    }
}

function insertTable() {
    const table = document.getElementById("table-data")
    if (table) {
        if(table.innerHTML) table.innerHTML += tableContent
        else{
            table.innerHTML = tableHead
            table.innerHTML += tableContent
        } 
    }
}
init()
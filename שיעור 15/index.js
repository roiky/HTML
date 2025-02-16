const DOM = {
    searchButton: document.getElementById("searchCars"),
    searchInput: document.getElementById("searchValue"),
    selectOptionKey: document.getElementById("keySelect")
}

const rawCarData = carsForRental.concat(carsForSale)
let allCars = rawCarData

function init() {

    const selectedKey = localStorage.getItem("SelectedKey")
    const lastSearch = localStorage.getItem("lastSearch")
    if(selectedKey) DOM.selectOptionKey.value = selectedKey
    if(lastSearch) DOM.searchInput.value = lastSearch

    DOM.selectOptionKey.addEventListener("change", function () {
        validateButtonDisabled(this.value, DOM.searchInput.value, DOM.searchButton)
        localStorage.setItem("SelectedKey",DOM.selectOptionKey.value)
    })
    DOM.searchInput.addEventListener("change", function () {
        validateButtonDisabled(DOM.selectOptionKey.value, this.value, DOM.searchButton)
    })
    DOM.searchButton?.addEventListener("click", function () {
        const value = document.getElementById("searchValue").value
        const key = document.getElementById("keySelect").value
        localStorage.setItem("lastSearch",value)
        const result = searchCars(allCars, key, value)
        loadTable(result)

    })
    document.getElementById("loadCarsRentButton")?.addEventListener("click", function () {
        loadTable(carsForRental)
    })
    document.getElementById("loadCarsSaleButton")?.addEventListener("click", function () {
        loadTable(carsForSale)
    })

    document.getElementById("loadAllCarsButton")?.addEventListener("click", function () {
        // loadTable([...carsForRental, ...carsForSale])
        const all = carsForRental.concat(carsForSale)
        loadTable(all)
    })


    loadForm(allCars)

    document.getElementById("insertCar")?.addEventListener("click",function(){
        allFormInputs = document.getElementsByClassName("formInput");
        let tempObj = {}
        // for (let index = 0; index < allFormInputs.length; index++) {
        //     tempArr.push(allFormInputs[index].id)
            
        // }
        tempObj = {
            Name: allFormInputs[0].value,
            Miles_per_Gallon: allFormInputs[1].value,
            Cylinders: allFormInputs[2].value,
            Displacement: allFormInputs[3].value,
            Horsepower: allFormInputs[4].value,
            NaWeight_in_lbs: allFormInputs[5].value,
            Acceleration : allFormInputs[6].value,
            Year : allFormInputs[7].value,
            Origin : allFormInputs[8].value,
        }
        allCars.push(tempObj)
        loadTable(allCars)
    })

}

function loadForm(fieldArr){
    dropdownContent = document.getElementById("inputsForm");
    dropdownContent.innerHTML = "";
    const firstElement = fieldArr[0];
    const fields = Object.keys(firstElement);
    for (let index = 0; index < fields.length; index++) {
        dropdownContent.innerHTML +=  `<span>${fields[index]}</span> <input placeholder="Enter Parameter" id=${fields[index]}-input class="formInput mt-1" type="text"> <br>`        
    }
    dropdownContent.innerHTML += `<button id="insertCar" class="btn btn-success mt-2"> Add Car </button>`
}

function searchCars(cars, key, value) {
    if (!key || !value) return;
    if (!Array.isArray(cars)) return
    let result = [];
    const valueNum = +value
    for (let index = 0; index < cars.length; index++) {
        const currentCar = cars[index]
        if (currentCar[key] >= valueNum) {
            result.push(cars[index])
        }
    }
    return result;
}

function validateButtonDisabled(selectValue, inputValue, buttonToDisable) {
    if (selectValue === "0" || inputValue === "") {
        buttonToDisable.disabled = true
    } else {
        buttonToDisable.disabled = false
    }
}

init();



function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = ""
    document.getElementById("table-cars-body").innerHTML = ""

}

function loadTable(arrayOfCars) {
    if (!Array.isArray(arrayOfCars)) return; // validate that arrayOfCars is array
    if (arrayOfCars.length === 0) return; // validate that there is data inside the array
    clearTable()
    const firstElement = arrayOfCars[0]
    const fields = Object.keys(firstElement).sort()
    console.log(firstElement)
    console.log(fields)
    const theadTr = document.getElementById("table-cars-headers")
    if (theadTr) {
        for (let index = 0; index < fields.length; index++) {
            const th = document.createElement("th")
            th.innerText = fields[index].replaceAll("_", " ")
            theadTr.append(th)
        }
        theadTr.append(getTD("Actions", "", "th"))
    }
    const tBody = document.getElementById("table-cars-body")
    if (tBody) {
        for (let index = 0; index < arrayOfCars.length; index++) {
            const currentCar = arrayOfCars[index];
            const tr = document.createElement("tr")
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`
            for (let index = 0; index < fields.length; index++) {
                const currentField = fields[index];
                tr.append(getTD(currentCar[currentField], "-"))
            }

            const tdButton = getTdButton()
            tr.append(tdButton)
            tBody.append(tr)
            // tr.append(getTD(currentCar.Name),
            //     getTD(currentCar.Miles_per_Gallon, 0),
            //     getTD(currentCar.Cylinders),
            //     getTD(currentCar.Displacement),
            //     getTD(currentCar.Acceleration),
            //     getTD(currentCar.Weight_in_lbs),
            //     getTD(currentCar.Horsepower, 999),
            //     getTD(currentCar.Year, "2000-04-04"),
            //     getTD(currentCar.Origin, "ISRAEL")
            // )

        }
    }


}


function getTdButton() {
    const button = document.createElement("button")
    button.classList.add("btn", "btn-danger")

    const icon = `<i class="bi bi-trash3"></i>`
    button.innerHTML = icon

    button.onclick = function () {
        console.log(this.parentElement.parentElement.remove())
    }
    const tdButton = document.createElement("td")
    tdButton.append(button)
    return tdButton
}
function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type)
    currentTD.innerHTML = value || defaultValue
    return currentTD
}





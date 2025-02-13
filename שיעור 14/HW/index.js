let allCarsArray = [...carsForSale, ...carsForRental]


function init(){
    loadTable([...carsForSale, ...carsForRental]);

    document.getElementById("SaleCars")?.addEventListener("click",function(){
        loadTable(carsForSale);
    })
    document.getElementById("RentCars")?.addEventListener("click",function(){
        loadTable(carsForRental);
    })
    document.getElementById("AllCars")?.addEventListener("click",function(){
        loadTable([...carsForSale, ...carsForRental]);
    })
    document.getElementById("DeleteAll")?.addEventListener("click",function(){
        clearTable();
    })
    //Listener for buttons
    document.getElementById("searchByHPButton")?.addEventListener("click",function(){
        const inputTextElement = document.getElementById("searchTextHP")
        const result = searchCars(allCarsArray, inputTextElement?.value,"Horsepower")
        loadTable(result)
    })

    document.getElementById("searchByAccelerationButton")?.addEventListener("click",function(){
        const inputTextElement = document.getElementById("searchTextACC")
        const result = searchCars(allCarsArray, inputTextElement?.value,"Acceleration")
        loadTable(result)
    })
    document.getElementById("searchByCylindersButton")?.addEventListener("click",function(){
        const inputTextElement = document.getElementById("searchTextCYL")
        const result = searchCars(allCarsArray, inputTextElement?.value,"Cylinders")
        loadTable(result)
    })
    document.getElementById("searchByWeightButton")?.addEventListener("click",function(){
        const inputTextElement = document.getElementById("searchTextWEIGHT")
        const result = searchCars(allCarsArray, inputTextElement?.value,"Weight_in_lbs")
        loadTable(result)
    })
}

init();


function searchCars(carsArray, searchText,field) {
    if (!Array.isArray(carsArray)) return; // validate that arrayOfCars is array
    if (typeof searchText !== 'string') return;
    if (!searchText.length) return carsArray;

    let result = [];
    const toLowerSearchText = searchText.toLowerCase()
    
    for (let index = 0; index < carsArray.length; index++) {
        const currentCar = carsArray[index];
        let tempValue = 0;
        if (typeof currentCar[field] === 'number') tempValue = currentCar[field];
        if (String(tempValue).toLowerCase() === toLowerSearchText) {
            result.push(currentCar);    
        }

    }
    return result;
}

function searchCarsByName(carsArray, searchText,field) {
    if (!Array.isArray(carsArray)) return; // validate that arrayOfCars is array
    if (typeof searchText !== 'string') return;
    if (!searchText.length) return carsArray;

    let result = [];
    const toLowerSearchText = searchText.toLowerCase()
    
    for (let index = 0; index < carsArray.length; index++) {
        const currentCar = carsArray[index];
        let tempValue = 0;
        if (typeof currentCar[field] === 'number') tempValue = currentCar[field];
        if (String(tempValue).toLowerCase().includes(toLowerSearchText)) {
            result.push(currentCar);
        }

    }
    return result;
}











function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = ""
    document.getElementById("table-cars-body").innerHTML = ""
}

function loadTable(CarsArr) {
    clearTable()
    const firstElement = CarsArr[0]
    const fields = Object.keys(firstElement)
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
        for (let index = 0; index < CarsArr.length; index++) {
            const currentCar = CarsArr[index];
            const tr = document.createElement("tr")
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`
            for (let index = 0; index < fields.length; index++) {
                const currentField = fields[index];
                tr.append(getTD(currentCar[currentField], "-"))
            }

            const tdButton = getTdButton()
            tr.append(tdButton)
            tBody.append(tr)
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





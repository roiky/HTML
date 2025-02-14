let allCarsArray = [...carsForSale, ...carsForRental]
//document.getElementById("searchTextHP").value = ""

function init(){
    loadTable([...carsForSale, ...carsForRental]);

    clearAllInputs();

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
        clearAllInputs();
    })

    //Dropdowns events

    loadDropdown(allCarsArray);

    let allItemsinDropdown = document.getElementsByClassName("dropdown-item");
    let dropdownButton = document.getElementsByClassName("dropdown-toggle")[0]; 

    for (let index = 0; index < allItemsinDropdown.length; index++) {
        allItemsinDropdown[index].addEventListener("click",function(){
            dropdownButton.textContent = allItemsinDropdown[index].textContent
        })
        
    }

    //Listener for search buttons
    document.getElementById("searchButton")?.addEventListener("click",function(){
        const inputTextElement = document.getElementById("searchText")
        const result = searchCars(allCarsArray, inputTextElement?.value,dropdownButton.textContent)
        loadTable(result)
        updateResult(result)
        
    })

    document.getElementById("searchText")?.addEventListener("input",function(){
        if(dropdownButton.textContent != "Name" && dropdownButton.textContent != "Origin") return;
        const inputTextElement = document.getElementById("searchText")
        const result = searchCars(allCarsArray, inputTextElement?.value,dropdownButton.textContent)
        loadTable(result)
        updateResult(result)
        
    })

}

init();

function loadDropdown(fieldArr){
    dropdownContent = document.getElementById("searchDropdown");
    dropdownContent.innerHTML = "";
    const firstElement = fieldArr[0];
    const fields = Object.keys(firstElement);
    for (let index = 0; index < fields.length; index++) {
        dropdownContent.innerHTML +=  `<li><a class="dropdown-item" href="#">${fields[index]}</a></li>`        
    }
}

function updateResult(arr){
    resultItem = document.getElementById("resultCounter");
    if (typeof arr[0] === 'undefined') {
        resultItem.classList.add("fw-bold","text-danger")
        resultItem.innerHTML = `no results were found!`; 
    }
    else {
        resultItem.classList.remove("fw-bold","text-danger");
        resultItem.innerHTML = `${arr.length} results were found!`
    }
}

function searchCars(carsArray, searchText, field) {
    if (!Array.isArray(carsArray)) return; 
    if (typeof searchText !== 'string') return;
    if (!searchText.length) return carsArray;

    let result = [];
    const toLowerSearchText = searchText.toLowerCase()
    
    for (let index = 0; index < carsArray.length; index++) {
        const currentCar = carsArray[index];
        let tempValue = 0;
        if (typeof currentCar[field] === 'number'){
            tempValue = currentCar[field];
            if (String(tempValue).toLowerCase() === toLowerSearchText) {
                result.push(currentCar);    
            }
        } 
        else if(typeof currentCar[field] === 'string'){
            if (currentCar[field].toLowerCase().includes(toLowerSearchText)) {
                result.push(currentCar);
            }
        }
    }
    return result;
}

function clearAllInputs(){
    allInputs = document.getElementsByTagName("input");
    for (let index = 0; index < allInputs.length; index++) {
        allInputs[index].value = "";
    }
}

function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = ""
    document.getElementById("table-cars-body").innerHTML = ""
}

function loadTable(CarsArr) {
    clearTable()
    const firstElement = CarsArr[0]
    if(typeof firstElement === 'undefined') return;
    const fields = Object.keys(firstElement)
    // console.log(firstElement)
    // console.log(fields)
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





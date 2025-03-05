
let taxRate, usrIncome, nameInput, prdctPrice, taxIncluded=true, selectedCategory, tempArr = [],payday;
const allMonths = [`Drinks`, `Meat`, `Dairy`, `Snacks`, `Basic`];

const inputs = {
    sendButton : document.getElementById("sendBtn"),
    incomeInput : document.getElementById("userIncome"),
    nikoiInput : document.getElementById("nameInput"),
    commentInput : document.getElementById("prdctPrice"),
    selectedCategory : document.getElementById("categoiesSelector"),
    paymentDate : document.getElementById("imgLink")
}

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>'
}

function init(){

    loadCategories("categoiesSelector");

    inputs.sendButton?.addEventListener("click",function(){

        selectedCategory = inputs.selectedCategory.value;
        currentTax = localStorage.getItem("TaxRate");
        if(!usrIncome || !payday) return console.log("must insert income and payday!");
        const tempRow = new newRow(usrIncome,nameInput,prdctPrice,taxIncluded,selectedCategory, currentTax, payday);
        insertToLS(tempRow,"AllIncomes");
        loadTable(LStoArray("AllIncomes"));
        cleanInputs();
    })

    inputs.incomeInput?.addEventListener("change",function(){
        usrIncome = inputs.incomeInput.value;
    })

    inputs.nikoiInput?.addEventListener("change",function(){
        nameInput = inputs.nikoiInput.value;
    })

    inputs.commentInput?.addEventListener("change",function(){
        prdctPrice = inputs.commentInput.value;
    })

    inputs.paymentDate?.addEventListener("change",function(){
        payday = inputs.paymentDate.value;
    })

    console.log(LStoArray("AllIncomes"))
    loadTable(LStoArray("AllIncomes"))

}  
    
init();

function newRow(_income, _nikoi, _comm, _taxInclude,_month, _taxRate, _payday){
    this.income = Number(_income) || null;
    this.nikoi = Number(_nikoi) || null;
    this.comment = _comm || null;
    this.taxInclude = _taxInclude || null;
    this.month = _month || null;
    this.taxRate = Number(_taxRate)/100 || null;
    if(_taxInclude){
        this.finalAmount = _income/(1+Number(this.taxRate))
    }
    else{
        this.finalAmount = _income*(1+Number(this.taxRate))
    }
    this.taxAmount = Math.abs(this.income - this.finalAmount);
    this.dateCreated = new Date().toLocaleDateString('he-IL');

    if(_payday){
        const dateParts = _payday.split("-"); // [0] = YYYY, [1] = MM, [2] = DD
        this.paymentDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
    }

    this.id = `${Date.now() + Math.ceil(Math.random() * 9999)}`;
}


function LStoArray(LSName) {
    let LSstring = localStorage.getItem(LSName);

    if (!LSstring || LSstring === "") { 
        return []; 
    }

    try {
        return JSON.parse(LSstring);
    } catch (error) {
        console.log("Error parsing localStorage data:", error);
        return [];
    }
}


function insertToLS(obj, LSName){
    //NEED TO CHECK IF OBJ.ID IS ALREADY IN LS
    LSArr = LStoArray(LSName);
    if(!LSArr) LSArr = [];
    LSArr.push(obj);
    LSStr = JSON.stringify(LSArr);
    localStorage.setItem(LSName,LSStr);
    console.log(`item id ${obj.id} added to ${LSName}!`)
}

function loadTable(Arr){
    if (!Array.isArray(Arr)) return;
    const tableHeaders = document.querySelector("#tableHeaders");
    const tableBody = document.querySelector("#productsBody")

    tableHeaders.innerHTML = "";
    tableBody.innerHTML = "";

    const firstElement = Arr[0]
    if(typeof firstElement === 'undefined' || Arr.length === 0) return console.log("ERR1");
    const fields = Object.keys(firstElement)

    fields.forEach(field => { //table headers
        const th = document.createElement("th");
        th.textContent = field;
        tableHeaders.append(th);
    })

    const deleteHeader = document.createElement("th");
    deleteHeader.textContent = "Delete";
    tableHeaders.append(deleteHeader);

    Arr.forEach(obj =>{ //table rows
        const row = document.createElement("tr");

        fields.forEach(field => {
            const newTD = document.createElement("td");
            newTD.textContent = obj[field];
            row.append(newTD);
        })

        const deleteData = document.createElement("td"); //delete button section
        const deleteButton = window.document.createElement("button");
        const buttonText = window.document.createElement("h5");
        deleteButton.classList.add("btn","btn-danger");
        deleteButton.innerHTML = BSIcons.TRASH;

        deleteButton.addEventListener("click",function(){
            removeFromLS(obj.id,"AllIncomes");
        })

        buttonText.appendChild(deleteButton);
        deleteData.append(buttonText)

        row.append(deleteData)

        tableBody.append(row);
    })

}

function cleanInputs(){
    const allInputs = document.querySelectorAll("input");
    for (let index = 0; index < allInputs.length; index++) {
        const element = allInputs[index];
        element.value = ""
    }
}

function loadCategories(location){
    const monthsDiv = document.querySelector(`#${location}`);

    allMonths.forEach(month =>{
        newMonth = document.createElement("option");
        newMonth.textContent = month;
        monthsDiv.append(newMonth);
    })

}

function removeFromLS(id, LSName) {
    const LSArr = LStoArray(LSName);
    if(LSArr.length < 1) return ;

    const itemIndex = LSArr.findIndex( (item) => item.id === id);
    if (itemIndex > -1){
        LSArr.splice(itemIndex,1);
        const LSStr = JSON.stringify(LSArr);
        localStorage.setItem(LSName,LSStr);
        console.log(`item id ${id} was removed from LS ${LSName}!`);

        loadTable(LStoArray("AllIncomes"));
        cleanInputs();
    }
}
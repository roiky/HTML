
let taxRate, usrIncome, nameInput, prdctPrice, taxIncluded=true, selectedCategory, tempArr = [],imgLink;
const allCategories = [`Drinks`, `Meat`, `Dairy`, `Snacks`, `Basic`];

const inputs = {
    sendButton : document.getElementById("sendBtn"),
    nameInput : document.getElementById("nameInput"),
    priceInput : document.getElementById("prdctPrice"),
    selectedCategory : document.getElementById("categoiesSelector"),
    imgInput : document.getElementById("imgLinkInput")
}

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>'
}

function init(){

    loadCategories("categoiesSelector"); //load all categires from "allCategories" array!

    inputs.sendButton?.addEventListener("click",function(){

        selectedCategory = inputs.selectedCategory.value;
        if(!imgLink || !nameInput || !prdctPrice) return console.log("must fill all the inputs!");
        const tempRow = new newRow(nameInput,prdctPrice,selectedCategory, imgLink);
        console.log(tempRow)
        insertToLS(tempRow,"AllProducts");
        loadTable(LStoArray("AllProducts"));
        cleanInputs();
    })

    inputs.nameInput?.addEventListener("change",function(){
        nameInput = inputs.nameInput.value;
    })

    inputs.priceInput?.addEventListener("change",function(){
        prdctPrice = inputs.priceInput.value;
    })

    inputs.imgInput?.addEventListener("change",function(){
        imgLink = inputs.imgInput.value;
    })

    console.log(LStoArray("AllProducts"));
    cleanInputs();
    loadTable(LStoArray("AllProducts"));

}  
    
init();
//newRow(nameInput,prdctPrice,selectedCategory, imgLink);
function newRow(_name, _price, _category, _img){
    this.name = _name || null;
    this.price = _price || null;
    this.category = _category || null;
    this.img = _img || null;
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
    const allInputs = document.querySelectorAll(".input");
    for (let index = 0; index < allInputs.length; index++) {
        const element = allInputs[index];
        element.value = "";
    }
}

function loadCategories(location){
    const monthsDiv = document.querySelector(`#${location}`);

    allCategories.forEach(month =>{
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
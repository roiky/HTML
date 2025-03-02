
let taxRate, usrIncome, nikoiTax, usrComment, taxIncluded=true, selectedMonth, tempArr = [];
const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function init(){

    loadMonths("monthSelected");

    document.getElementById("sendBtn")?.addEventListener("click",function(){
        //loadTable(carsForSale);
        notIncludedBox = document.getElementById("flexRadioDefault2");
        IncludedBox = document.getElementById("flexRadioDefault1");
        if(notIncludedBox.checked) taxIncluded = false;
        if(IncludedBox.checked) taxIncluded = true;
        selectedMonth = document.getElementById("monthSelected").value;
        //console.log(`TEST - ${usrIncome} Month: ${selectedMonth}`)
        currentTax = localStorage.getItem("TaxRate");
        const tempRow = new newRow(usrIncome,nikoiTax,usrComment,taxIncluded,selectedMonth, currentTax) 
        
        insertToLS(tempRow,"AllIncomes")
        //console.log(tempRow)
        loadTable(LStoArray("AllIncomes"))
        cleanInputs();
    })

    document.getElementById("taxRate")?.addEventListener("input",function(){
        taxRate = document.getElementById("taxRate").value;
        localStorage.setItem("TaxRate",taxRate);
    })

    document.getElementById("userIncome")?.addEventListener("change",function(){
        usrIncome = document.getElementById("userIncome").value;
    })

    document.getElementById("nikoiTax")?.addEventListener("change",function(){
        nikoiTax = document.getElementById("nikoiTax").value;
    })

    document.getElementById("comment")?.addEventListener("change",function(){
        usrComment = document.getElementById("usrComment").value;
    })


    loadTable(LStoArray("AllIncomes"))

}  
    
init();

function newRow(_income, _nikoi, _comm, _taxInclude,_month, _taxRate){
    this.income = _income || null;
    this.nikoi = _nikoi || null;
    this.comment = _comm || null;
    this.taxInclude = _taxInclude || null;
    this.month = _month || null;
    this.taxRate = _taxRate || null;
    if(_taxInclude){
        this.finalAmount = _income/(1+Number(_taxRate)/100)
    }
    else{
        this.finalAmount = _income*(1+Number(_taxRate)/100)
    }
    this.taxAmount = Math.abs(this.income - this.finalAmount);
    this.dateCreated = new Date().toLocaleDateString('he-IL');
    this.id = `${Date.now() + Math.ceil(Math.random() * 9999)}`;
}


function LStoArray(LSName){
    let LSstring = localStorage.getItem(LSName);

    if(!LSstring){
        localStorage.setItem(LSName,"");
    }

    try {
        return JSON.parse(LSstring);
    } catch (error) {
        console.log(error)
        return [];
    }
}

function insertToLS(obj, LSName){
    LSArr = LStoArray(LSName);
    if(!LSArr) LSArr = [];
    LSArr.push(obj);
    LSStr = JSON.stringify(LSArr);
    localStorage.setItem(LSName,LSStr);

}

function loadTable(Arr){
    //Array validation!
    const tableHeaders = document.querySelector("#tableHeaders");
    const tableBody = document.querySelector("#incomeBody")

    tableHeaders.innerHTML = "";
    tableBody.innerHTML = "";

    const firstElement = Arr[0]
    if(typeof firstElement === 'undefined' || Arr.length === 0) return console.log("ERR1");
    const fields = Object.keys(firstElement)

    fields.forEach(field => {
        const th = document.createElement("th");
        th.textContent = field;
        tableHeaders.append(th);
    })

    Arr.forEach(obj =>{
        const row = document.createElement("tr");

        fields.forEach(field => {
            const newTD = document.createElement("td");
            newTD.textContent = obj[field];
            row.append(newTD);
        })
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

function loadMonths(location){
    const monthsDiv = document.querySelector(`#${location}`);

    allMonths.forEach(month =>{
        newMonth = document.createElement("option");
        newMonth.textContent = month;
        monthsDiv.append(newMonth);
    })

}
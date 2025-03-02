
let taxRate, usrIncome, nikoiTax, usrComment, taxIncluded=true, selectedMonth, tempArr = [];

function init(){
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

}  
    
init();

function newRow(_income, _nikoi, _comm, _taxInclude,_month, _taxRate){
    this.income = _income;
    this.nikoi = _nikoi;
    this.comment = _comm;
    this.taxInclude = _taxInclude;
    this.month = _month;
    this.taxRate = _taxRate;
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
    LSArr.push(obj);
    LSStr = JSON.stringify(LSArr);
    localStorage.setItem(LSName,LSStr);

}

function loadTable(Arr){
    console.log(Arr)
}
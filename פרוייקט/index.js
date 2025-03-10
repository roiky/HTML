
const inputs = {
    sendButton : document.getElementById("saveTask"),
    resetButton : document.getElementById("resetForm"),
    taskDesc : document.getElementById("taskDesc"),
    taskDate : document.getElementById("taskDueDate"),
    taskTime : document.getElementById("taskDueTime")
}

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>',
    X: '<i class="bi bi-x"></i>'
}

function init(){

    //add draw for all existing tasks!
    inputs.resetButton.click();
    inputs.sendButton?.addEventListener("click",function(){
 
        if(!inputs.taskDesc.value || !inputs.taskDate.value || !inputs.taskTime.value) return console.log("must fill all the inputs!");

        const taskDesc = inputs.taskDesc.value;
        const taskDate = inputs.taskDate.value;
        const taskTime = inputs.taskTime.value;
        const tempTask = new newTask(taskDesc,taskDate,taskTime);
        console.log(tempTask)
        insertToLS(tempTask,"AllTasks");
        // loadTable(LStoArray("AllProducts"));
        inputs.resetButton.click();
    })

}

init();



/* =======================================================[Functions]================================================================================ */

function newTask(_description, _date, _time){
    this.desc = _description || null;
    this.time = _time || null;
    this.id = `${Date.now() + Math.ceil(Math.random() * 9999)}`;
    const dateParts = _date.split("-"); // [0] = YYYY, [1] = MM, [2] = DD
    this.date = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
}

function LStoArray(LSName) {
    if(typeof LSName !== "string") return;
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
    if(typeof LSName !== "string" || typeof obj !== "object") return console.log("ERR2");
    LSArr = LStoArray(LSName);
    if(!LSArr) LSArr = [];
    LSArr.push(obj);
    LSStr = JSON.stringify(LSArr);
    localStorage.setItem(LSName,LSStr);
    console.log(`item id ${obj.id} added to ${LSName}!`)
}
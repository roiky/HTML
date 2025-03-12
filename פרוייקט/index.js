
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

    inputs.resetButton.click();
    inputs.sendButton?.addEventListener("click",function(){ 
        const taskDesc = inputs.taskDesc.value;
        const taskDate = inputs.taskDate.value;
        const taskTime = inputs.taskTime.value;
        if(!taskDesc || !taskDate || !taskTime) return console.log("must fill all the inputs!");

        const tempTask = new newTask(taskDesc,taskDate,taskTime);
        console.log(tempTask)
        insertToLS(tempTask,"AllTasks");
        
        inputs.resetButton.click();
        loadCards(LStoArray("AllTasks"), "tasksContent")
    })

    console.log(LStoArray("AllTasks"));
    loadCards(LStoArray("AllTasks"), "tasksContent")
}

init();



/* =======================================================[Functions]================================================================================ */

function newTask(_description, _date, _time){
    //validate types
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
    if(typeof LSName !== "string" || typeof obj !== "object") return console.log("you sent wrong types to 'insertToLS'");
    LSArr = LStoArray(LSName);
    if(!LSArr) LSArr = [];
    LSArr.push(obj);
    LSStr = JSON.stringify(LSArr);
    localStorage.setItem(LSName,LSStr);
    console.log(`item id ${obj.id} added to ${LSName}!`)
}

function removeFromLS(id, LSName) {
    if(typeof LSName !== "string") return;
    const LSArr = LStoArray(LSName);
    if(LSArr.length < 1) return ;

    const itemIndex = LSArr.findIndex( (item) => item.id === id);
    if (itemIndex > -1){
        LSArr.splice(itemIndex,1);
        const LSStr = JSON.stringify(LSArr);
        localStorage.setItem(LSName,LSStr);
        console.log(`item id ${id} was removed from LS ${LSName}!`);
    }
}

function loadCards(array, targetContent) {
    if (!Array.isArray(array) || typeof targetContent !== "string") return; 
    const content = document.getElementById(targetContent) 
    if (!content) return;

    content.innerHTML = ""
    array.forEach(item => {
        const cardHtml = createCard(item);
        content.append(cardHtml);
    })
}

function createCard(j){
    const {desc, time, id, date} = j
    const newCard = window.document.createElement("div");
    newCard.id = `${id}`;
    newCard.classList.add("card","card-style","text-center","mt-4");
    // newCard.style.border = "2px solid #EBDCCB"

    const TaskID = window.document.createElement("p");
    const badge = window.document.createElement("span");
    badge.classList.add("badge","badge-light","mt-2");
    badge.style.background = "#E6AF2E"; 
    badge.style.color = "#191716"; 
    badge.textContent = `ID: ${id}`;
    TaskID.appendChild(badge);

    const TaskDesc = window.document.createElement("div");
    TaskDesc.classList.add("card-description"); 
    TaskDesc.innerHTML = `<b>Description</b><br> ${desc}`;    

    const taskDate = window.document.createElement("div");
    taskDate.innerHTML = `<b>Due Date:</b> ${date}`;

    const taskTime = window.document.createElement("div");
    taskTime.innerHTML = `<b>Due Time:</b> ${time}`;

    const valuesDiv = window.document.createElement("div");
    valuesDiv.classList.add("position-absolute","bottom-0","start-0")
    valuesDiv.append(taskDate,taskTime);

    const button = window.document.createElement("button");
    button.classList.add("btn","btn-danger", "btn-sm","mt-1","position-absolute","top-0","end-0");
    button.innerHTML = BSIcons.X;
    button.setAttribute("hidden","hidden");

    button.addEventListener("click",function(){
        newCard.classList.add("fade-out");
        removeFromLS(id,"AllTasks");

        setTimeout(() => {
            loadCards(LStoArray("AllTasks"), "tasksContent"); 
        }, 450); 
        
    })

    newCard.append(TaskID, TaskDesc, valuesDiv, button);

    newCard.addEventListener("mouseover",function(){
        button.removeAttribute("hidden");
    })
    newCard.addEventListener("mouseleave",function(){
        button.setAttribute("hidden","hidden");
    })

    return newCard;
}

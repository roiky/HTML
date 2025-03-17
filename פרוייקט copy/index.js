
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
    X: '<i class="bi bi-x"></i>',
    PENCIL: '<i class="bi bi-pencil"></i>',
    SAVE: '<i class="bi bi-floppy"></i>'
}

function init(){

    inputs.resetButton.click();
    inputs.sendButton?.addEventListener("click",function(){ 
        const taskDesc = inputs.taskDesc.value;
        const taskDate = inputs.taskDate.value;
        const taskTime = inputs.taskTime.value;
        if(!taskDesc || !taskDate || !taskTime) return showError("must fill all the inputs!");

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
    alertify.success(`Task id (${obj.id}) has been added!`); 
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

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("position-absolute", "top-0", "end-0", "d-flex", "gap-1", "p-1");

    const saveWrapper = document.createElement("div");
    saveWrapper.classList.add("position-absolute", "top-0", "start-0", "d-flex", "gap-1", "p-1");

    const deleteButton = window.document.createElement("button");
    deleteButton.classList.add("btn","btn-danger", "btn-sm");
    deleteButton.innerHTML = BSIcons.X;
    deleteButton.setAttribute("hidden","hidden");

    const editInput = window.document.createElement("textarea");
    editInput.value = desc;
    editInput.setAttribute("hidden","hidden");

    deleteButton.addEventListener("click",function(){
        newCard.classList.add("fade-out");
        removeFromLS(id,"AllTasks");

        setTimeout(() => {
            loadCards(LStoArray("AllTasks"), "tasksContent"); 
        }, 450); 
        alertify.error(`Task id (${id}) has been removed!`); 
        
    })

    const editButton = window.document.createElement("button");
    editButton.classList.add("btn", "btn-primary", "btn-sm");
    editButton.innerHTML = BSIcons.PENCIL;
    editButton.setAttribute("hidden","hidden");

    editButton.addEventListener("click",function(){
        TaskDesc.setAttribute("hidden","hidden");
        editInput.removeAttribute("hidden");
        saveButton.removeAttribute("hidden");
    })

    const saveButton = window.document.createElement("button");
    saveButton.classList.add("btn", "btn-success", "btn-sm");
    saveButton.innerHTML = BSIcons.SAVE;
    saveButton.setAttribute("hidden","hidden");

    saveButton.addEventListener("click", function(){
        const currentInput = editInput.value;
        console.log(`new value ${currentInput}`);
        editExistCard("AllTasks", id, currentInput);
        loadCards(LStoArray("AllTasks"), "tasksContent");
    })

    buttonWrapper.append(editButton, deleteButton);
    saveWrapper.append(saveButton);
    newCard.append(TaskID, TaskDesc, valuesDiv, saveWrapper, buttonWrapper, editInput);

    newCard.addEventListener("mouseover",function(){
        deleteButton.removeAttribute("hidden");
        editButton.removeAttribute("hidden");
    })

    newCard.addEventListener("mouseleave",function(){
        deleteButton.setAttribute("hidden","hidden");
        editButton.setAttribute("hidden","hidden");
        saveButton.setAttribute("hidden","hidden");
    })

    return newCard;
}

function editExistCard(LSName, id, newDesc) {
    if (typeof LSName !== "string") return;
    
    const tempArr = LStoArray(LSName);

    const itemIndex = tempArr.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        console.log(`Task with ID ${id} does not exist.`);
        return;
    }

    tempArr[itemIndex].desc = newDesc;
    localStorage.setItem(LSName, JSON.stringify(tempArr));
    console.log(`Task ID ${id} updated successfully.`);
}

function showError(err){
    if (typeof err !== "string") return;
    alertify.dialog('alert').set({transition:'pulse',message: err}).show(); 
}
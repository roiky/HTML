
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
        // loadTable(LStoArray("AllTasks"));
        
        inputs.resetButton.click();
    })

    console.log(LStoArray("AllTasks"));
    tasksArr=LStoArray("AllTasks");
    loadCards(tasksArr, "tasksContent")

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

        //loadTable(LStoArray("AllProducts"));
        //cleanInputs();
    }
}

function loadCards(array, targetContent) {
    if (!Array.isArray(array)) return; // validate that arrayOfCars is array
    const content = document.getElementById(targetContent) // Tomer remind me!
    if (!content) return;

    content.innerHTML = ""
    for (let index = 0; index < array.length; index++) {
        const currentObject = array[index]
        const cardHtml = createCard(currentObject)
        content.appendChild(cardHtml)
    }
}

function createCard(j){
    const {desc, time, id, date} = j
    const newCard = window.document.createElement("div");
    newCard.id = `${id}`;
    newCard.classList.add("card","card-style","text-center");
    newCard.style.border = "2px solid #EBDCCB"

    const TaskID = window.document.createElement("p");
    const badge = window.document.createElement("span");
    badge.classList.add("badge","badge-light","mt-2");
    badge.style.background = "#E6AF2E"; 
    badge.style.color = "#191716"; 
    badge.textContent = `ID: ${id}`;
    TaskID.appendChild(badge);

    const TaskDesc = window.document.createElement("span");
    TaskDesc.innerHTML = `<b>Description</b><br> ${desc}`;

    const taskDate = window.document.createElement("span");
    taskDate.innerHTML = `<b>Due Date:</b> ${date}`;

    const taskTime = window.document.createElement("span");
    taskTime.innerHTML = `<b>Due Time:</b> ${time}`;

    const button = window.document.createElement("button");
    const buttonText = window.document.createElement("h5");
    button.classList.add("btn","btn-danger", "btn-sm","mt-1","position-absolute","top-0","end-0");
    button.innerHTML = BSIcons.X;


    button.addEventListener("click",function(){
        //addOrRemoveFromFav(imdbID,"favoritesMovies");
        //init();
        console.log(`you click on button id:${id}`)
    })
    buttonText.appendChild(button);

    newCard.append(TaskID, TaskDesc, taskDate, taskTime, buttonText);

    return newCard;
}
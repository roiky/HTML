function drawLenghtOfJokes(array, targetContent){
    if (!Array.isArray(array)) return; // validate that arrayOfCars is array
    const content = document.getElementById(targetContent)
    content.innerHTML = `Number of Jokes on this page: ${array.length}`
}

function drawAllTypes(arr, whereToDraw){
    const typesResult = countTypes(arr);
    const jokesTypeDiv = document.getElementById(whereToDraw)
    jokesTypeDiv.innerHTML = ""

    for (let type in typesResult ) {
        jokesTypeDiv.innerHTML += `${type}: ${typesResult[type]} <br>`
    }
}

function countTypes(arr){
    if(!Array.isArray(arr)) return ;
    let tempObj ={};

    for (let index = 0; index < arr.length; index++) {
        const current = arr[index];
        const currentType = current.type
        
        if(tempObj[currentType]){
            tempObj[currentType] += 1;
        }
        else{
            tempObj[currentType] = 1;
        }

    }
    return tempObj
}


function loadCards(array, targetContent, action = "add") {
    if (!Array.isArray(array)) return; // validate that arrayOfCars is array
    const content = document.getElementById(targetContent) // Tomer remind me!
    if (!content) return;
    content.innerHTML = ""
    for (let index = 0; index < array.length; index++) {
        const currentObject = array[index]
        const cardHtml = getCardTemplate(currentObject, action)
        content.innerHTML += cardHtml
    }

    drawLenghtOfJokes(array, "totalJokes")
    drawAllTypes(array, "jokesType")

}

function getCardTemplate(j, action) {
    const { id, punchline, type, setup } = j
    let button = `<h3> <button class="btn btn-primary" onClick="addToFavorites(${id})"> Add </button> </h3>`
    if (action === 'remove') {
        button = `<h3> <button class="btn btn-danger" onClick="removeFromFavorites(${id})"> Remove </button> </h3>`
    }

    return `<div id="${id}" class="card card-width">
                <h3>${id}</h3>
                <h2><span class="badge badge-light" style="background:blue">${type}</span></h2>
                <h2>${setup}</h2>
                <h2>${punchline}</h2>
                ${button}
                </div>`
}

function getJokeObjById(id, jokesArray) {
    // missing validations 
    for (let index = 0; index < jokesArray.length; index++) {
        const current = jokesArray[index];
        if (current.id === id) {
            return current;
        }
    }
}

function getJokeIndexById(id, jokesArray) {
    // missing validations 
    for (let index = 0; index < jokesArray.length; index++) {
        const current = jokesArray[index];
        if (current.id === id) {
            return index;
        }
    }

}

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>'
}

function isInLS(jid, LSName){
    const favoritesJokesString = localStorage.getItem(LSName)
    const TempFavArr = JSON.parse(favoritesJokesString)
    if(!TempFavArr) return ;
    
    for (let index = 0; index < TempFavArr.length; index++) {
        const currentObj = TempFavArr[index];
        if(currentObj.id === jid){
            return true;
        }
    }
}

function removeFromLS(id, LSName) {
    const favoritesJokesString = localStorage.getItem(LSName)
    if (favoritesJokesString) {
        const favoritesJokesArray = JSON.parse(favoritesJokesString)
        const jokeIndex = getJokeIndexById(id, favoritesJokesArray)

        if (jokeIndex !== undefined) {
            favoritesJokesArray.splice(jokeIndex, 1)
            const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)
            localStorage.setItem(LSName, favoritesJokesArrayString)
            init()
        }

    }
}


function moveFromLStoLS(moveFrom, moveTo){
    const favoritesJokesString = localStorage.getItem(moveTo)

    if(!favoritesJokesString){
        const emptyJokesArray = []
        const emptyJokesArrayString = JSON.stringify(emptyJokesArray)
        localStorage.setItem(moveTo, emptyJokesArrayString)
        moveFromLStoLS(moveFrom, moveTo)
    }
    else{
        const favoritesJokesArray = JSON.parse(favoritesJokesString)

        const tempFavoritesJokesString = localStorage.getItem(moveFrom)
        const tempFavoritesJokesArray = JSON.parse(tempFavoritesJokesString)

        for (let index = 0; index < tempFavoritesJokesArray.length; index++) {
            const currentTempJoke = tempFavoritesJokesArray[index];

            const found = getJokeObjById(currentTempJoke.id, favoritesJokesArray)
            if(!found){
                favoritesJokesArray.push(currentTempJoke)
            }
            
        }
        const jokesToLoad = JSON.stringify(favoritesJokesArray)
        localStorage.setItem(moveTo, jokesToLoad)
        localStorage.setItem(moveFrom, "[]")
    }
}

function addOrRemoveFromTempFav(id,LSName){
    const jokeToFavorite = getJokeObjById(id, jokes)

    const checkLS = localStorage.getItem(LSName)  
    if(!checkLS){
        const favoritesJokesArray = []
        const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)
        localStorage.setItem(LSName, favoritesJokesArrayString)
    }

    if (jokeToFavorite) {
        const favoritesJokesString = localStorage.getItem(LSName)  
        if(favoritesJokesString){
            //console.log(favoritesJokesString)
            const favoritesJokesArray = JSON.parse(favoritesJokesString)
            const found = getJokeObjById(id, favoritesJokesArray)
            
            if(!found){
                favoritesJokesArray.push(jokeToFavorite)
                const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)
                console.log(favoritesJokesArray)
                localStorage.setItem(LSName, favoritesJokesArrayString)
                console.log(`joke id: ${id} added to ${LSName}!`)
            }
            else{
                const jokeIndex = getJokeIndexById(id, favoritesJokesArray)
                favoritesJokesArray.splice(jokeIndex, 1)
                const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)
                localStorage.setItem(LSName, favoritesJokesArrayString)
                console.log(`joke id: ${id} removed from ${LSName}!`)
            }
        }

        loadCards(jokes, "jokesContent")
    }
}

function drawLenghtOfJokes(array, targetContent){
    if (!Array.isArray(array)) return; 
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
        const cardHtml = createCard(currentObject, action)
        content.appendChild(cardHtml)
    }

    drawLenghtOfJokes(array, "totalJokes")
    drawAllTypes(array, "jokesType")
}

function createCard(j, action){
    const { id, punchline, type, setup } = j
    const newCard = window.document.createElement("div");
    newCard.id = `${id}`;
    newCard.classList.add("card","card-width");

    const title = window.document.createElement("h5");
    const badge = window.document.createElement("span");
    badge.classList.add("badge","badge-light");
    badge.style.background = "#5c564b"; 
    badge.style.color = "#e4d4c8"; 
    badge.textContent = `${type} (${id})`;
    title.appendChild(badge);

    const setupText = window.document.createElement("p");
    setupText.innerHTML = `<b>Setup:</b> <br> ${setup}`;

    const punchText = window.document.createElement("p");
    punchText.innerHTML = `<b>Punchline:</b> <br> ${punchline}`;

    const button = window.document.createElement("button");
    const buttonText = window.document.createElement("h3");
    button.classList.add("btn");

    if(isInLS(id,"TempfavoritesJokes")){
        button.classList.add("btn-primary");
        button.innerHTML = BSIcons.WAIT;
        button.addEventListener("click",function(){
            addOrRemoveFromTempFav(id, "TempfavoritesJokes");
        })
    }
    else if(action === 'remove'){
        button.classList.add("btn-danger");
        button.innerHTML = BSIcons.TRASH;
        button.addEventListener("click",function(){
            removeFromLS(id, "favoritesJokes");
        })
    }
    else if (isInLS(id,"favoritesJokes")){
        button.classList.add("btn-warning");
        button.disabled = true;
        button.innerHTML = BSIcons.STAR;
    }
    else{
        button.classList.add("btn-success");
        button.innerHTML = BSIcons.PLUS;
        button.addEventListener("click",function(){
            addOrRemoveFromTempFav(id, "TempfavoritesJokes");
        })
    }

    buttonText.appendChild(button);

    newCard.append(title, setupText, punchText, buttonText);

    return newCard;

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
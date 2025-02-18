const allFavJokes = getJokesFromLS()
let pageFavJokes = allFavJokes

function init(){
    // console.log(jokes);
    // console.log(getJokesFromLS())
    loadFavCards(pageFavJokes)
    console.log("loaded all favorites cards")

    allFavs = document.getElementsByClassName("delBtn")
    for (let index = 0; index < allFavs.length; index++) {
        allFavs[index].addEventListener("click",function(){
            let currentJokeID = allFavs[index].id
            // let tempJokeObj = findJokeByID(Number(currentJokeID))
            // addJokeToLS(tempJokeObj)
            deleteJokeFromLS(currentJokeID)
            loadFavCards(pageFavJokes)

        })
        
    }
}

init();


function getJokesFromLS(){
    let allFavorites = localStorage.getItem("favoritesJokes")
    if(!allFavorites) return [];
    else return JSON.parse(allFavorites)
}

function findJokeByID(jokeID){
    for (let index = 0; index < jokes.length; index++) {
        if(jokes[index].id === jokeID){
            //console.log(jokes[index])
            return jokes[index]
        }
        
    }
    return null;
}

function deleteJokeFromLS(jokeID) {
    jokeID = Number(jokeID);

    let jokeIndex = pageFavJokes.findIndex(function(joke) {
        return joke.id === jokeID;
    });

    if (jokeIndex) {
        pageFavJokes.splice(jokeIndex, 1);
        localStorage.removeItem("favoritesJokes")

        let allFavoritesSTR = JSON.stringify(pageFavJokes)
        localStorage.setItem("favoritesJokes", allFavoritesSTR)
        console.log(`Joke ID ${jokeID} removed from LS`);

    } else {
        console.log(`Joke with ID ${jokeID} not found in pageFavJokes`);
    }
}

function addJokeToLS(jokeObj){
    let allFavorites = localStorage.getItem("favoritesJokes")
    if (allFavorites) {
        allFavorites = JSON.parse(allFavorites)
    }
    else{
        allFavorites = [];
    }

    let isExists = false;

    for (let index = 0; index < allFavorites.length; index++) {
        if(allFavorites[index].id === jokeObj.id){
            isExists = true;
            console.log(`Joke ${jokeObj.id} Already in favorites!`)
        }
    }

    if(!isExists){
        allFavorites.push(jokeObj)
        let allFavoritesSTR = JSON.stringify(allFavorites)
        localStorage.setItem("favoritesJokes", allFavoritesSTR)
        console.log(`Joke ${jokeObj.id} added to favorites!`)
    }
}

function getCardTemplate(id, setup, type, punch) {
    return `<div id="${id}" class="card card-width col-4 mt-1">
                <h5>${type} - ${id}</h5>
                <p>Setup: ${setup}</p>
                <p>Punchline: ${punch}</p>
                <h3> <button class="btn btn-danger delBtn" id=${id}> delete from favorites </button> </h3>
                </div>`
}

function loadFavCards(cardsArr){
    if (!Array.isArray(cardsArr)) return; // validate that arrayOfCars is array
     const content = document.getElementById("hold-cards")
     cleanPage()

    for (let index = 0; index < cardsArr.length; index++) {
        let currectItem = cardsArr[index]
        const cardHTML = getCardTemplate(currectItem.id, currectItem.setup,currectItem.type,currectItem.punchline)
        content.innerHTML += cardHTML
    }
}

function cleanPage(){
    const content = document.getElementById("hold-cards")
    content.innerHTML = ""
}
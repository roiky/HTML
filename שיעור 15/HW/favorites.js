const allFavJokes = getJokesFromLS()
let pageFavJokes = allFavJokes

function init(){
    console.log(pageFavJokes)
    loadFavCards(pageFavJokes)
    console.log("loaded all favorites cards")
}

init();


function getJokesFromLS(){
    let allFavorites = localStorage.getItem("favoritesJokes")
    if(!allFavorites) return [];
    else return JSON.parse(allFavorites)
}

function deleteJokeFromLS(jokeID,deleteFromArr) {
    if (!Array.isArray(deleteFromArr)) return; 
    jokeID = Number(jokeID);

    let jokeIndex = deleteFromArr.findIndex(function(joke) {
        return joke.id === jokeID;
    });

    if (jokeIndex > -1) {
        deleteFromArr.splice(jokeIndex, 1);
        localStorage.removeItem("favoritesJokes")

        let allFavoritesSTR = JSON.stringify(deleteFromArr)
        localStorage.setItem("favoritesJokes", allFavoritesSTR)
        console.log(`Joke ID ${jokeID} removed from LS`);

    } else {
        console.log(`Joke with ID ${jokeID} not found in the array!`);
    }
}

function getCardTemplate(id, setup, type, punch) {
    return `<div id="${id}" class="card card-width col-4 mt-1 text-center ">
                <h5>${type} - ${id}</h5>
                <p><b>Setup:</b> <br> ${setup}</p>
                <p><b>Punchline:</b> <br> ${punch}</p>
                <h3> <button class="btn btn-danger delBtn" id=${id}> <i class="bi bi-trash"></i> </button> </h3>
                </div>`
}

function loadFavCards(cardsArr){
    if (!Array.isArray(cardsArr)) return; 
     const content = document.getElementById("hold-cards")
     cleanPage()

    for (let index = 0; index < cardsArr.length; index++) {
        let currectItem = cardsArr[index]
        const cardHTML = getCardTemplate(currectItem.id, currectItem.setup,currectItem.type,currectItem.punchline)
        content.innerHTML += cardHTML
    }

    allFavs = document.getElementsByClassName("delBtn")
    for (let index = 0; index < allFavs.length; index++) {
        allFavs[index].addEventListener("click",function(){
            let currentJokeID = allFavs[index].id
            deleteJokeFromLS(currentJokeID,pageFavJokes)
            loadFavCards(pageFavJokes)
        })
    }
}

function cleanPage(){
    const content = document.getElementById("hold-cards")
    content.innerHTML = ""
}
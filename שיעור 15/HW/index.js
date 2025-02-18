const jokes = allJokes
let pageJokes = jokes

function init(){
    console.log(jokes);
    loadCards(jokes)

    document.getElementById("createCardsButton")?.addEventListener("click",function(){
        loadCards(jokes)
        console.log("loaded all cards")
    })

    document.getElementById("cleanButton")?.addEventListener("click",function(){
        cleanPage()
        console.log("cleaned all cards")

    })
}

init();

function findJokeByID(jokeID){
    for (let index = 0; index < jokes.length; index++) {
        if(jokes[index].id === jokeID){
            //console.log(jokes[index])
            return jokes[index]
        }
        
    }
    return null;
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
    return `<div id="${id}" class="card card-width col-4 mt-1 text-center">
                <h5>${type} - ${id}</h5>
                <p><b>Setup:</b> <br> ${setup}</p>
                <p><b>Punchline:</b> <br>  ${punch}</p>
                <h3> <button class="btn btn-warning favBtn" id=${id}> <i class="bi bi-star"></i> </button> </h3>
                </div>`
}

function cleanPage(){
    const content = document.getElementById("hold-cards")
    content.innerHTML = ""
}

function loadCards(cardsArr){
    if (!Array.isArray(cardsArr)) return; 
     const content = document.getElementById("hold-cards")
     cleanPage()

    for (let index = 0; index < cardsArr.length; index++) {
        let currectItem = cardsArr[index]
        const cardHTML = getCardTemplate(currectItem.id, currectItem.setup,currectItem.type,currectItem.punchline)
        content.innerHTML += cardHTML
    }

    allFavs = document.getElementsByClassName("favBtn")
    for (let index = 0; index < allFavs.length; index++) {
        allFavs[index].addEventListener("click",function(){
        let currentJokeID = allFavs[index].id
        let tempJokeObj = findJokeByID(Number(currentJokeID))
        addJokeToLS(tempJokeObj)
        })
        
    }
}
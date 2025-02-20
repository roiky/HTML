
// THIS ROW IS NOT RELATED TO THE DESTRUCTURING const joke11111 = { "type": "general", "setup": "What do birds give out on Halloween?", "punchline": "Tweets.", "id": 187 }
try {
    a
} catch (error) {
    console.log("we had an error!!!")
}

function init() {

    document.getElementById("allToFavButton")?.addEventListener("click",function(){
        moveFromLStoLS("TempfavoritesJokes", "favoritesJokes")
        loadCards(jokes, "jokesContent")
    })

    loadCards(jokes, "jokesContent")

    //isInLS()
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
        else{
            const favoritesJokesArray = []
            const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)
            localStorage.setItem(LSName, favoritesJokesArrayString)
            addOrRemoveFromTempFav(id)
        }
        loadCards(jokes, "jokesContent")
    }
}


function alertSuccess() {
    Swal.fire({
        title: "Added successfully!",
        icon: "success"
    });
}
function alertError() {
    Swal.fire({
        title: "Already added!",
        icon: "error"
    });
}


init()
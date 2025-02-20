
// THIS ROW IS NOT RELATED TO THE DESTRUCTURING const joke11111 = { "type": "general", "setup": "What do birds give out on Halloween?", "punchline": "Tweets.", "id": 187 }
try {
    a
} catch (error) {
    console.log("we had an error!!!")
}

function init() {

    document.getElementById("allToFavButton")?.addEventListener("click",function(){
        //console.log("test")
    })
    loadCards(jokes, "jokesContent")
    console.log(countTypes(jokes))
}

function addToTempFavorites(id){
    const jokeToFavorite = getJokeObjById(id, jokes)
    if (jokeToFavorite) {
        const favoritesJokesString = localStorage.getItem("TempfavoritesJokes")  
        if(favoritesJokesString){
            const favoritesJokesArray = JSON.parse(favoritesJokesString)
            const found = getJokeObjById(jokeToFavorite.id, favoritesJokesArray)
            if(!found){
                favoritesJokesArray.push(jokeToFavorite)
                const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)
                localStorage.setItem("TempfavoritesJokes", favoritesJokesArrayString)
                console.log(`joke id: ${id} added to temp favorites!`)
            }
            else{
                //some code to remove from temp 
                //in the loadCards add a feature that identify if the id is in the temp, if so change the icon so the user will know its already in the temp list.
                console.log(`joke id: ${id} removed from temp favorites!`)
            }
        }

    }
}

function addToFavorites(id) {
    const jokeToFavorite = getJokeObjById(id, jokes)
    if (jokeToFavorite) {
        const favoritesJokesString = localStorage.getItem("favoritesJokes")  // fetch from LS (get)
        if (favoritesJokesString) {
            const favoritesJokesArray = JSON.parse(favoritesJokesString) // JSON.parse 
            const found = getJokeObjById(jokeToFavorite.id, favoritesJokesArray)
            if (!found) {
                favoritesJokesArray.push(jokeToFavorite) // push into array
                const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)// JSON.stringify
                localStorage.setItem("favoritesJokes", favoritesJokesArrayString)// insert into LS (set)
                //alertSuccess()
                console.log(`joke id: ${id} added to favorites!`)
            } else {
                //alertError()
                console.log(`joke id: ${id} already in favorites!`)
            }
        } else {
            localStorage.setItem("favoritesJokes", JSON.stringify([jokeToFavorite]))
        }
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
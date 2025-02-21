
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
}

init()
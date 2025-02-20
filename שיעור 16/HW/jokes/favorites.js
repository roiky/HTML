function init() {
    const favoritesJokesString = localStorage.getItem("favoritesJokes")
    const favoritesJokesArray = JSON.parse(favoritesJokesString)
    loadCards(favoritesJokesArray, "jokesContentFavorites", "remove")
    console.log(countTypes(favoritesJokesArray))

    
}

init()

function removeFromFavorites(id) {
    const favoritesJokesString = localStorage.getItem("favoritesJokes")
    if (favoritesJokesString) {
        const favoritesJokesArray = JSON.parse(favoritesJokesString)
        const jokeIndex = getJokeIndexById(id, favoritesJokesArray)
        if (jokeIndex !== undefined) {
            favoritesJokesArray.splice(jokeIndex, 1)
            const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)
            localStorage.setItem("favoritesJokes", favoritesJokesArrayString)
            init()
        }

    }


}
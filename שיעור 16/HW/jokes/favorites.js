function init() {
    const favoritesJokesString = localStorage.getItem("favoritesJokes")
    const favoritesJokesArray = JSON.parse(favoritesJokesString)
    loadCards(favoritesJokesArray, "jokesContentFavorites", "remove")
    console.log(countTypes(favoritesJokesArray))


}

init()


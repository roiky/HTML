

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>'
}


function init(){
    console.log(movies)
    loadCards(movies,"imdbContent")
}
 init();


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
}

function isInLS(jid, LSName){
    const favoritesJokesString = localStorage.getItem(LSName)
    const TempFavArr = JSON.parse(favoritesJokesString)
    if(!TempFavArr) return false;
    
    for (let index = 0; index < TempFavArr.length; index++) {
        const currentObj = TempFavArr[index];
        if(currentObj.imdbID === jid){
            return true;
        }
    }
}

function createCard(j, action){
    const { Title, Year,Rated, Released, Runtime, Genre, Director, Writer, image, imdbRating, imdbVotes, imdbID, Type} = j
    const newCard = window.document.createElement("div");
    newCard.id = `${imdbID}`;
    newCard.classList.add("card","card-width");

    const Movietitle = window.document.createElement("h5");
    const badge = window.document.createElement("span");
    badge.classList.add("badge","badge-light");
    badge.style.background = "#5c564b"; 
    badge.style.color = "#e4d4c8"; 
    badge.textContent = `${Title} (${Year})`;
    Movietitle.appendChild(badge);

    const ratedText = window.document.createElement("span");
    ratedText.innerHTML = `<b>Rated:</b>${Rated}`;

    const releasedText = window.document.createElement("span");
    releasedText.innerHTML = `<b>Released:</b>${Released}`;

    const runtimeText = window.document.createElement("span");
    runtimeText.innerHTML = `<b>Runtime:</b>${Runtime}`;

    const genereText = window.document.createElement("span");
    genereText.innerHTML = `<b>Genere:</b>${Genre}`;

    const directorText = window.document.createElement("span");
    directorText.innerHTML = `<b>Director:</b>${Director}`;

    const writerText = window.document.createElement("span");
    writerText.innerHTML = `<b>Writer:</b>${Writer}`;

    const ratingText = window.document.createElement("span");
    ratingText.innerHTML = `<b>Rating:</b>${Math.round(imdbRating,0)}`;

    const votesText = window.document.createElement("span");
    votesText.innerHTML = `<b>Votes:</b>${imdbVotes}`;

    const typeText = window.document.createElement("span");
    typeText.innerHTML = `<b>Type:</b>${Type}`;

    const button = window.document.createElement("button");
    const buttonText = window.document.createElement("h3");
    button.classList.add("btn");

    if(isInLS(imdbID,"favoritesMovies")){
        button.classList.add("btn-primary");
        button.innerHTML = BSIcons.STAR;
        button.addEventListener("click",function(){
            addOrRemoveFromTempFav(id, "TempfavoritesJokes");
        })
    }
    else{
        button.classList.add("btn-success");
        button.innerHTML = BSIcons.PLUS;
        button.addEventListener("click",function(){
            addOrRemoveFromTempFav(id, "TempfavoritesJokes");
        })
    }

    buttonText.appendChild(button);

    newCard.append(Movietitle, ratedText, releasedText, runtimeText, genereText, directorText,writerText, ratingText, votesText, typeText, buttonText);

    return newCard;
}
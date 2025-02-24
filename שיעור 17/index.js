

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>'
}


function init(){
    //console.log(movies[0].Images)
    loadCards(movies,"imdbContent")
    // const content = window.document.getElementById("imdbContent");
    // content.append(createCarousel("test",movies[0].Images));
}
 init();

 function createCarousel(id, imgArr){
    if (!Array.isArray(imgArr)) return console.log("NOT AN ARRAY!");
    const newCarousel = window.document.createElement("div");
    newCarousel.id = `crsl-${id}`;
    newCarousel.classList.add("carousel", "slide");

    const newIndicator = window.document.createElement("div");
    newIndicator.classList.add("carousel-indicators");

    const newInner = window.document.createElement("div");
    newInner.classList.add("carousel-inner");

    for (let index = 0; index < imgArr.length; index++) {
        const currentImg = imgArr[index];

        const indicatorButton = window.document.createElement("button");
        indicatorButton.type = "button";
        indicatorButton.setAttribute("data-bs-target", `#${newCarousel.id}`);
        indicatorButton.setAttribute("data-bs-slide-to", index.toString());
        indicatorButton.setAttribute("aria-label",`Slide ${index+1}`)
        
        if(index === 0){
            indicatorButton.classList.add("active");
            indicatorButton.setAttribute("aria-current","true");
        }

        newIndicator.append(indicatorButton);

        const imgDiv = window.document.createElement("div");
        imgDiv.classList.add("carousel-item");
        if(index === 0){
            imgDiv.classList.add("active");
        }

        const img = window.document.createElement("img");
        img.classList.add("d-block","w-100");
        img.src = currentImg;

        imgDiv.append(img);
        newInner.append(imgDiv);
    }

    const prevButton = window.document.createElement("button");
    prevButton.type = "button";
    prevButton.classList.add("carousel-control-prev");
    prevButton.setAttribute("data-bs-slide","prev");
    prevButton.setAttribute("data-bs-target", `#${newCarousel.id}`);
    const prevIcon = window.document.createElement("span");
    prevIcon.classList.add("carousel-control-prev-icon");
    prevIcon.setAttribute("aria-hidden","true");
    const prevText = window.document.createElement("span");
    prevText.classList.add("visually-hidden");
    prevText.textContent = "Previous";

    prevButton.append(prevIcon,prevText);

    const nextButton = window.document.createElement("button");
    nextButton.type = "button";
    nextButton.classList.add("carousel-control-next");
    nextButton.setAttribute("data-bs-slide","next");
    nextButton.setAttribute("data-bs-target", `#${newCarousel.id}`);
    const nextIcon = window.document.createElement("span");
    nextIcon.classList.add("carousel-control-next-icon");
    nextIcon.setAttribute("aria-hidden","true");
    const nextText = window.document.createElement("span");
    nextText.classList.add("visually-hidden");
    nextText.textContent = "Next";

    nextButton.append(nextIcon,nextText);

    newCarousel.append(newIndicator,newInner,prevButton,nextButton);

    return newCarousel;

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
    const { Title, Year,Rated, Released, Runtime, Genre, Director, Writer, Images, imdbRating, imdbVotes, imdbID, Type} = j
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

    const imagesCarousel = createCarousel(imdbID,Images);

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

    newCard.append(Movietitle, imagesCarousel, ratedText, releasedText, runtimeText, genereText, directorText,writerText, ratingText, votesText, typeText, buttonText);

    return newCard;
}
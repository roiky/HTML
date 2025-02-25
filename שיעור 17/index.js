

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>'
}

let charts = {}

function init(){
    loadCards(movies,"imdbContent")

    const result = aggregateTypes(movies,"Type")
    createChart(result,"firstChart","Types from all")

    const favArr = LStoArray("favoritesMovies")
    const favResult = aggregateTypes(favArr,"Type")
    createChart(favResult, "secondChart", "Types from favorites")
}
 init();

function LStoArray(LSName){
    let LSstring = localStorage.getItem(LSName);

    if(!LSstring){
        console.log(`${LSName} do not exist in LocalStorage!`);
        return [];
    }

    try {
        return JSON.parse(LSstring);
    } catch (error) {
        console.log(error)
        return [];
    }
}

 function createCarousel(id, imgArr){
    if (!Array.isArray(imgArr)) return;
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
        img.style.minHeight = "300px"
        img.style.maxHeight = "300px"
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
    newCard.style.border = "2px solid #EBDCCB"

    const Movietitle = window.document.createElement("h3");
    const badge = window.document.createElement("span");
    badge.classList.add("badge","badge-light","mt-2");
    badge.style.background = "#E6AF2E"; 
    badge.style.color = "#191716"; 

    if(Year[Year.length -1] === "–"){
        badge.textContent = `${Title} (${Year}Now)`;
    }
    else{
        badge.textContent = `${Title} (${Year})`;
    }
    
    Movietitle.appendChild(badge);

    const imagesCarousel = createCarousel(imdbID,Images);

    const ratedText = window.document.createElement("span");
    ratedText.innerHTML = `<b>Rated:</b> ${Rated}`;

    const releasedText = window.document.createElement("span");
    releasedText.innerHTML = `<b>Released:</b> ${Released}`;

    const runtimeText = window.document.createElement("span");
    runtimeText.innerHTML = `<b>Runtime:</b> ${Runtime}`;

    const genereText = window.document.createElement("span");
    genereText.innerHTML = `<b>Genere:</b> ${Genre}`;

    const directorText = window.document.createElement("span");
    directorText.innerHTML = `<b>Director:</b> ${Director}`;

    const writerText = window.document.createElement("span");
    writerText.innerHTML = `<b>Writer:</b> ${Writer}`;

    const ratingText = window.document.createElement("span");
    const movieRating = Math.round(imdbRating,0);
    ratingText.innerHTML = `<b>Rating:</b>   `;

    if(imdbRating === "N/A"){
        ratingText.innerHTML += `Not available!`;
    }
    else{
        for (let index = 1; index <= movieRating; index++) {
            ratingText.innerHTML += `${BSIcons.STAR} `;
        }
    }
    
    const votesText = window.document.createElement("span");
    const votesNumber = parseInt(imdbVotes.replace(",",""),10)
    votesText.innerHTML = `<b>Votes:</b> ${votesNumber}`;

    const typeText = window.document.createElement("span");
    typeText.innerHTML = `<b>Type:</b> ${Type}`;

    const IDText = window.document.createElement("span");
    IDText.innerHTML = `<b>ID:</b> ${imdbID}`;

    const button = window.document.createElement("button");
    const buttonText = window.document.createElement("h3");
    button.classList.add("btn");

    if(isInLS(imdbID,"favoritesMovies")){
        button.classList.add("btn-danger");
        button.innerHTML = BSIcons.TRASH;
    }
    else{
        button.classList.add("btn-warning");
        button.innerHTML = BSIcons.STAR;
    }

    button.addEventListener("click",function(){
        addOrRemoveFromFav(imdbID,"favoritesMovies");
        init();
    })
    buttonText.appendChild(button);

    newCard.append(Movietitle, imagesCarousel, ratedText, releasedText, runtimeText, genereText, directorText,writerText, ratingText, votesText, typeText, IDText, buttonText);

    return newCard;
}

function getObjById(id, fromArray) {
    if (!Array.isArray(fromArray)) return;
    for (let index = 0; index < fromArray.length; index++) {
        const current = fromArray[index];
        if (current.imdbID === id) {
            return current;
        }
    }
}

function addOrRemoveFromFav(id,LSName){
    const itemToFavorites = getObjById(id, movies)

    const checkLS = localStorage.getItem(LSName)  
    if(!checkLS){
        const favoritesArray = []
        const favoritesArrayString = JSON.stringify(favoritesArray)
        localStorage.setItem(LSName, favoritesArrayString)
    }

    if (itemToFavorites) {
        const favoritesJokesString = localStorage.getItem(LSName)  
        if(favoritesJokesString){
            let favoritesArray = JSON.parse(favoritesJokesString)
            const found = getObjById(id, favoritesArray)
            
            if(!found){
                favoritesArray.push(itemToFavorites)
                const favoritesArrayString = JSON.stringify(favoritesArray)
                console.log(favoritesArray)
                localStorage.setItem(LSName, favoritesArrayString)
                console.log(`item id: ${id} added to "${LSName}"!`)
            }
            else{
                const itemIndex = favoritesArray.findIndex(function(item){
                    return item.imdbID === id;
                })
                favoritesArray.splice(itemIndex, 1)
                const favoritesArrayString = JSON.stringify(favoritesArray)
                localStorage.setItem(LSName, favoritesArrayString)
                console.log(`item id: ${id} removed from "${LSName}"!`)
            }
        }
    }
}

function aggregateTypes(arr,keyToCount){
    if (!Array.isArray(arr)) return;
    let stats = {};
    arr.forEach(function(currentItem)   {
        if(stats[currentItem[keyToCount]]){ // if true we have something in the object under the relevant key
            stats[currentItem[keyToCount]] = stats[currentItem[keyToCount]] + 1
        }else{
            stats[currentItem[keyToCount]] = 1;
        }
    })
    return stats;
}

function createChart(obj, canvasID, chartTitle = "Title"){
    const content = document.querySelector(`#${canvasID}`)
    if(!content) return;

    let labels = []
    let data = []   
    for(const property in obj){
        labels.push(property)
        data.push(obj[property])
    }

    //const ctx = content.querySelector(`#${canvasID}`)
    //const ctx = document.getElementById('myChart');

    if(charts[canvasID]){
        charts[canvasID].destroy()
    }
    charts[canvasID] = new Chart(content, {
      type: 'pie',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      
      data: {
        labels:labels,
        datasets: [{
          label: 'Number of Types',
          data: data,
          borderWidth: 2,
          backgroundColor:
          [
            'rgb(21, 7, 102)',
            'rgb(100, 16, 16)'
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,  
        scales:
         {
        //   y: {
        //     beginAtZero: true
        //   }
        },
        plugins:{
                title:{
                    display: true,
                    text: chartTitle, 
                    font:{
                            size: 20 
                        },
                    color: 'black', 
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                }
            }      
        }
    });
}
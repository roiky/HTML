const DOM = {
    selectedCat: null,
    prevButton: null,
    nextButton: null
}

init()
getCategories()


function init() {

    DOM.selectedCat = document.getElementById("drop")
    
     
    document.getElementById("drop").addEventListener("change", function() {
        console.log(this.value)
        showLoader(true)
        drawByCategory(DOM.selectedCat.value)
    });

}

function drawByCategory(category){
    const fetchURL = `https://dummyjson.com/products/category/${category}`
    fetch(fetchURL).then(success).catch(failed).finally(() => {showLoader(false)})

    function success(data) {
        data.json().then((s) => {
            draw(s.products)
        })
    }

    function failed(error) {
        console.log(error)
        alert("Something went wrong!")
    }
}


function draw(products) {
    const content = document.getElementById("content")
    const titles = products.map(p => { 
        content.appendChild(createCard(p))
         })
}

function getCategories(){
    const dropdown = document.getElementById("drop")
    const categoriesURL =  'https://dummyjson.com/products/categories'
    fetch(categoriesURL)
    .then((result) => {
        result.json().then((cat) => cat.map((C) => dropdown.innerHTML += `<option value=${C.slug} >${C.name}</option>`))
       
    })
    .catch((err) => console.log(err))

}

function showLoader(show) {
    if (show) {
      document.querySelector("#content").innerHTML = "<h1>Loading...</h1>";
    } else {
      document.querySelector("#content").innerHTML = "";
    }
  }
  

function createCard(j){
    const {id, title, category, price, rating, thumbnail} = j
    const newCard = window.document.createElement("div");
    newCard.id = `${id}`;
    newCard.classList.add("card","mt-2","text-center");
    newCard.style.border = "2px solid #EBDCCB"
    newCard.style.width = "300px"

    const cardBadge = window.document.createElement("p");
    const badge = window.document.createElement("span");
    badge.classList.add("badge","badge-light","mt-2");
    badge.style.background = "#E6AF2E"; 
    badge.style.color = "#191716"; 
    badge.textContent = `ID: ${id}`;
    
    cardBadge.appendChild(badge);

    //const imagesCarousel = createCarousel(imdbID,Images);

    const img = window.document.createElement("img");
    img.src = thumbnail;
    img.classList.add("card-img-top");
    img.width = 300;
    img.height = 200;

    const titleText = window.document.createElement("span");
    titleText.innerHTML = `<b>Title:</b> ${title}`;

    const categoryText = window.document.createElement("span");
    categoryText.innerHTML = `<b>Category:</b> ${category}`;

    const ratingText = window.document.createElement("span");
    ratingText.innerHTML = `<b>Rating:</b> ${rating}`;

    const priceText = window.document.createElement("span");
    priceText.innerHTML = `<b>Price:</b> ${price}$`;

    const button = window.document.createElement("button");
    const buttonText = window.document.createElement("h3");
    button.classList.add("btn","btn-sm");

        button.classList.add("btn-success");
        button.innerHTML = `BUY` //BSIcons.STAR;

    button.addEventListener("click",function(){
        console.log("PREESED BUY")
    })
    buttonText.appendChild(button);

    newCard.append(cardBadge, img, titleText, categoryText, ratingText, priceText, buttonText);

    return newCard;
}
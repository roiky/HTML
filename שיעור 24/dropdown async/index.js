const DOM = {
    selectedCat: null,
    prevButton: null,
    nextButton: null,
    content: null,
    dropdown: null,
    loader: null,
};

const BSIcons = {
    PLUS: '<i class="bi bi-plus"></i>',
    STAR: '<i class="bi bi-star-fill"></i>',
    TRASH: '<i class="bi bi-trash3-fill"></i>',
    WAIT: '<i class="bi bi-clock"></i>',
    X: '<i class="bi bi-x"></i>',
    ARROW_RIGHT: `<i class="bi bi-arrow-right"></i>`,
    ARROW_LEFT: `<i class="bi bi-arrow-left"></i>`,
    BAG_ADD: `<i class="bi bi-bag-plus"></i>`,
};

init();
getCategories();

const itemsLimit = 3;
let skipCounter = 0;

function init() {
    DOM.selectedCat = document.getElementById("drop");
    DOM.prevButton = document.getElementById("prevBtn");
    DOM.nextButton = document.getElementById("nextBtn");
    DOM.content = document.getElementById("content");
    DOM.dropdown = document.getElementById("drop");
    DOM.loader = document.querySelector("#loader");

    DOM.nextButton.innerHTML = BSIcons.ARROW_RIGHT;
    DOM.prevButton.innerHTML = BSIcons.ARROW_LEFT;
    DOM.content.classList.add("d-flex", "align-items-start"); // => each card will have his own height when button appear

    DOM.selectedCat.addEventListener("change", function () {
        console.log(this.value);
        skipCounter = 0;
        showLoader(true);
        drawByCategory(DOM.selectedCat.value);
    });

    DOM.nextButton.addEventListener("click", function () {
        if (!DOM.dropdown.value) return alert(`select category first!`);
        skipCounter++;
        drawByCategory(DOM.selectedCat.value);
    });

    DOM.prevButton.addEventListener("click", function () {
        if (!DOM.dropdown.value) return alert(`select category first!`);
        if (skipCounter === 0) return;
        skipCounter--;
        drawByCategory(DOM.selectedCat.value);
    });
}

function drawByCategory(category) {
    if (typeof category !== `string`) return console.log(`error with category`);
    const fetchURL = `https://dummyjson.com/products/category/${category}?limit=${itemsLimit}&skip=${skipCounter * itemsLimit}`;
    fetch(fetchURL).then(success).catch(failed);

    function success(data) {
        data.json().then((s) => {
            if (s.products.length === 0) {
                alert("no more products!");
                skipCounter--;
                showLoader(false);
                return;
            } else {
                draw(s.products);
                showLoader(false);
                console.log(skipCounter);
            }
        });
    }

    function failed(error) {
        console.log(error);
        alert("Something went wrong!");
        showLoader(false); // אם נכשל, גם להוריד loader
    }
}

function draw(products) {
    if (typeof products !== `object`) return console.log(`error with products type`);
    DOM.content.innerHTML = "";

    products.forEach((p) => {
        DOM.content.appendChild(createCard(p));
    });
}

async function getCategories() {
    const categoriesURL = "https://dummyjson.com/products/categories";
    DOM.dropdown.innerHTML += `<option value="" disabled selected hidden>Select Category</option>`;
    try {
        //what should happend
        const result = await fetch(categoriesURL);
        const data = await result.json();
        data.map((C) => (DOM.dropdown.innerHTML += `<option value=${C.slug} >${C.name}</option>`));
    } catch (error) {
        //what will happen if error
        console.log(error);
    } finally {
        // happens anyway
        console.log("function is done!");
    }
}

function showLoader(show) {
    if (show) {
        DOM.loader.innerHTML = "<h1>Loading...</h1>";
    } else {
        DOM.loader.innerHTML = "";
    }
}

function createCard(j) {
    const { id, title, category, price, rating, thumbnail } = j;
    const newCard = window.document.createElement("div");
    newCard.id = `${id}`;
    newCard.classList.add("card", "mt-2", "text-center");
    newCard.style.margin = "10px";
    newCard.style.border = "2px solid #a0a0a0";
    newCard.style.width = "300px";

    const cardBadge = window.document.createElement("p");
    const badge = window.document.createElement("span");
    badge.classList.add("badge", "badge-light", "mt-2");
    badge.style.background = "#a0a0a0";
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
    button.classList.add("btn", "btn-success", "w-auto", "mx-auto", "d-block", "d-none");
    button.setAttribute("hidden", "hidden");
    button.innerHTML = BSIcons.BAG_ADD; //BSIcons.STAR;

    button.addEventListener("click", function () {
        console.log(`pressed buy for ID: ${id}`);
    });

    newCard.addEventListener("mouseover", function () {
        button.classList.remove("d-none");
    });
    newCard.addEventListener("mouseleave", function () {
        button.classList.add("d-none");
    });

    newCard.append(cardBadge, img, titleText, categoryText, ratingText, priceText, button);

    return newCard;
}

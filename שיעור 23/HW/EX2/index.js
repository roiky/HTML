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

    DOM.selectedCat.addEventListener("change", function () {
        console.log(this.value);
        skipCounter = 0;
        showLoader(true);
        drawByCategory(DOM.selectedCat.value);
    });

    DOM.nextButton.addEventListener("click", function () {
        skipCounter++;
        drawByCategory(DOM.selectedCat.value);
    });

    DOM.prevButton.addEventListener("click", function () {
        if (skipCounter === 0) return;
        skipCounter--;
        drawByCategory(DOM.selectedCat.value);
    });
}

function drawByCategory(category) {
    const fetchURL = `https://dummyjson.com/products/category/${category}?limit=${itemsLimit}&skip=${
        skipCounter * itemsLimit
    }`;
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
    DOM.content.innerHTML = "";

    products.forEach((p) => {
        DOM.content.appendChild(createCard(p));
    });
}

function getCategories() {
    const categoriesURL = "https://dummyjson.com/products/categories";
    fetch(categoriesURL)
        .then((result) => {
            result
                .json()
                .then((cat) =>
                    cat.map(
                        (C) =>
                            (DOM.dropdown.innerHTML += `<option value=${C.slug} >${C.name}</option>`)
                    )
                );
        })
        .catch((err) => console.log(err));
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
    const buttonText = window.document.createElement("h3");
    button.classList.add("btn", "btn-md");

    button.classList.add("btn-success");
    button.innerHTML = BSIcons.BAG_ADD; //BSIcons.STAR;

    button.addEventListener("click", function () {
        console.log("PREESED BUY");
    });
    buttonText.appendChild(button);

    newCard.append(
        cardBadge,
        img,
        titleText,
        categoryText,
        ratingText,
        priceText,
        buttonText
    );

    return newCard;
}

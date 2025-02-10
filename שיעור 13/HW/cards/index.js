// if(!Array.isArray(products)) return;
function cleanCards(){
    document.getElementById("cardsHolder").innerHTML = ""
}


function createCards(CardsArr){
    const mainContainer = window.document.getElementsByClassName(`container`)[0];
    const newRow = window.document.createElement("div");
    newRow.id = "cardsHolder";
    newRow.classList.add("row");
    
    for (let index = 0; index < CardsArr.length; index++) {
        let currentProduct = CardsArr[index];
    
        const col = window.document.createElement("div")
        col.classList.add("col-md-4","mb-2");
    
        const card = window.document.createElement("div");
        card.classList.add("card",`CID:${currentProduct.id}`);
        card.style.width = "100%";
    
        const img = window.document.createElement("img");
        img.src = currentProduct.images[0];
        img.classList.add("card-img-top");
        img.width = 300;
        img.height = 300;
    
        const cardBody = window.document.createElement("div");
        cardBody.classList.add("card-body");
    
        const title = window.document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = currentProduct.title;
    
        const prodID = window.document.createElement("p");
        prodID.classList.add("card-text");
        prodID.textContent = `ID: ${currentProduct.id}`;
        
        const prodDesc = window.document.createElement("p");
        prodDesc.classList.add("card-text");
        prodDesc.textContent = `Description: ${currentProduct.description}`;
    
        const prodPrice = window.document.createElement("p");
        prodPrice.classList.add("card-text");
        prodPrice.textContent = `Price: ${currentProduct.price}$`;  
    
        const prodDelete = window.document.createElement("button");
        prodDelete.classList.add("btn", "btn-danger");
        prodDelete.textContent = "Delete";
        prodDelete.onclick = function(){
            col.remove();
            console.log(`Deleted card with ID: ${currentProduct.id}`);
        }
    
    
        //add to body
        cardBody.append(title, prodID, prodDesc, prodPrice, prodDelete);
    
        //add body to card
        card.append(img, cardBody);
    
        //add card to column
        col.append(card);
    
        //add column to row
        newRow.append(col);
    }
    
    //add row to container
    mainContainer.append(newRow);
}

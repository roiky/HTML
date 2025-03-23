const DOM = {
    selectedCat: null,
    prevButton: null,
    nextButton: null

}
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

function callApi(inputText) {
    fetch(`https://dummyjson.com/products/search?q=${inputText}`).then(success).catch(failed)
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
    const titles = products.map(p => { return `<p>${p.title}</p>` })
    document.querySelector("#content").innerHTML = titles.join("")
}

init()
getCategories()


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
function callGetProducts(whatToSearch) {
  showLoader(true);
  const productsUrl = `https://dummyjson.com/products/search?q=${whatToSearch}`;
  fetch(productsUrl)
    .then((result) => {
      // result = HTTP response object
      result.json().then((data) => {
        const products = data.products;
        showLoader(false);
        draw(products);
      });
    })
    .catch((res) => console.log(res));
}

function showLoader(show) {
  if (show) {
    document.querySelector("#content").innerHTML = "<h1>Loading...</h1>";
  } else {
    document.querySelector("#content").innerHTML = "";
  }
}
function init() {
  document.getElementById("getAll").addEventListener("click", function () {
    const searchValue = document.querySelector("#searchInput").value;
    callGetProducts(searchValue);
  });

  document.getElementById("increaseCounter").addEventListener("click", () => {
    document.querySelector("#counter").innerText =
      Number(document.querySelector("#counter").innerText) + 1;
  });
}

function draw(products) {
  const titles = products.map((p) => {
    return `<h2>${p.title}</h2>`;
  });
  document.querySelector("#content").innerHTML = titles.join("");
}

init();

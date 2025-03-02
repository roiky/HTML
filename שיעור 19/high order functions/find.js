function findP(id) {
    for (let index = 0; index < data.products.length; index++) {
        if (data.products[index].id === id) {
            return data.products[index]
        }
    }
}

const singleObject = data.products.find((c) => c.id === 27)

// input id 27
function findPindex(id) {
    for (let index = 0; index < data.products.length; index++) {
        if (data.products[index].id === id) {
            return index
        }
    }
    return null;
}

const productIndex = data.products.findIndex((c) => c.id === 27)
if (productIndex > -1) data.products.splice(productIndex, 1)

console.log("singleObject", singleObject)


// array of products ids for all the products with price lower than 50
// array of products return policies for all the products with minimumOrderQuantity > 10

console.log("=======[1]=======");

function returnID(obj){
    return obj.id;
}

const under50 = data.products.filter((currentProduct) => currentProduct.price < 10000)
const indexArr = under50.map((C) =>{return C.id})
console.log(indexArr)

console.log("=======[2]=======");
const min10 = data.products.filter((currentProduct) => currentProduct.minimumOrderQuantity > 10)
const policiesArr = min10.map((C) =>{return C.returnPolicy})
console.log(policiesArr)

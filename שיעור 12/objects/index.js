/*

//ex 1 

myCar = {
    type: "family",
    engine: "big",
    color: "white",
    doors: 4,
    model: "TT",
    year: 2022,
    km: 22
}

function addKM(car,num){
    car.km = car.km+num
}

console.log(`car color: ${myCar.color}`)

myCar.color = "red"
console.log(`car color: ${myCar.color}`)
myCar["color"] = "RED"
console.log(`car color: ${myCar.color}`)

console.log("Whole car:")
console.log(myCar)


console.log(`car km: ${myCar.km}`)
addKM(myCar,30)
console.log(`car km: ${myCar.km}`)

*/

//ex2
let myCart = [];

function addProduct(productName, productPrice, productID){
    let newProduct = {
        name: productName,
        price: productPrice,
        ID: productID,
        date: new Date().toString()
    }

    return newProduct;
}
for (let index = 0; index < 3; index++) {
    
    let productName = prompt(`please enter product name:`)
    let productPrice = +prompt(`please enter ${productName} price:`)
    let productID = prompt(`please enter ${productName} ID:`)
    myCart.push(addProduct(productName, productPrice, productID))
}


console.log(myCart)
"use strict";
// TODO: define type Product
function printProduct(product) {
    console.log(`Product: ${product.name} costs $${product.price} and is ${product.inStock ? "available" : "out of stock"}.`);
}
const user = {
    username: "coolcat99",
    email: "coolcat@example.com",
    login() {
        return true; // Just a dummy implementation
    },
};
//=====================[ex3 - Generics]===============================
wrapInArray(5); // returns [5]
wrapInArray("hello"); // returns ["hello"]
function wrapInArray(item) {
    return [item];
}
const result = wrapInArray("test"); // result should be ["test"]
function handleStatus(status) {
    if (status.status === "success") {
        console.log("Everything went fine!");
    }
    else if (status.status === "error") {
        console.log("There was a problem!");
    }
    else if (status.status === "loading") {
        console.log("Loading, please wait...");
    }
}
// TODO: define types HasId and HasTimestamp
function logEntity(entity) {
    console.log(`Entity #${entity.id} was last updated at ${entity.timestamp}`);
}

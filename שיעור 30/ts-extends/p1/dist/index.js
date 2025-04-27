"use strict";
const userName = "Talya@gmail.com";
setTimeout(() => {
    const theCode = document.getElementById("someId");
    const content = document.getElementById("content");
    if (theCode !== null) {
        theCode.innerText = "Tomer is in Thailand";
    }
    if (content) {
        const image = document.createElement("img");
        image.src = "https://avatars.githubusercontent.com/u/85292283?v=4";
        image.height = 400;
        image.width = 400;
        content.append(image);
    }
    const tomerBeforeImage = document.querySelector("#tomerBefore");
}, 3000);
function getParamFromObjectGeneric(obj) {
    return obj.a;
}
function resultOfFunction(a, b) {
    return Object.assign(Object.assign(Object.assign({}, a), b), { id: new Date().toISOString() });
}
const result1 = resultOfFunction({ user: "tomera" }, { email: "tomer@aaa.com" });
console.log(result1);
const result2 = resultOfFunction({ car: "skoda" }, { lp: 5454565 });
// Dummy function to show how to return an string |  undefined
const somethingSeomthing = getParamFromOBj({ a: "sss" });
function getParamFromOBj(obj) {
    if (obj.a)
        return obj.a;
    return;
}

const userName: string = "Talya@gmail.com"

setTimeout(() => {
    const theCode = document.getElementById("someId")
    const content = document.getElementById("content")

    if (theCode !== null) {
        theCode.innerText = "Tomer is in Thailand"
    }

    if (content) {
        const image = document.createElement("img")
        image.src = "https://avatars.githubusercontent.com/u/85292283?v=4"
        image.height = 400
        image.width = 400
        content.append(image)
    }


    const tomerBeforeImage = document.querySelector<HTMLImageElement>("#tomerBefore")


}, 3000);


function getParamFromObjectGeneric<T>(obj: { a: T }): T {
    return obj.a;
}

function resultOfFunction<T, K>(a: T, b: K): T & K & { id: string } {
    return { ...a, ...b, id: new Date().toISOString() }
}

const result1 = resultOfFunction<{ user: string }, { email: string }>({ user: "tomera" }, { email: "tomer@aaa.com" })
console.log(result1)
const result2 = resultOfFunction<{ car: string }, { lp: number }>({ car: "skoda" }, { lp: 5454565 })



// Dummy function to show how to return an string |  undefined
const somethingSeomthing = getParamFromOBj({ a: "sss" })
function getParamFromOBj(obj: { a: string }): string | undefined {
    if (obj.a) return obj.a
    return;
}

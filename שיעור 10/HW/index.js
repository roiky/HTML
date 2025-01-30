/*
//Page 15 ex 1

console.log(`script start`)

let sum = 0;
let counter = 1;

while(counter <= 3){
    const currentNumber = +prompt(`Enter Number ${counter}:`);
    sum = sum + currentNumber;
    counter++
}

console.log(`sum: ${sum}`)
console.log(`average: ${sum/counter}`)

console.log(`script end`)

//Page 15 ex 2

console.log(`script start`)

const lenght = +prompt(`Enter lenght:`);
const width = +prompt(`Enter width:`);

console.log(`area: ${lenght*width}`)
console.log(`scope: ${(lenght+width)*2}`)

console.log(`script end`)

//Page 19 ex 6
console.log(`script start`)

const name = prompt(`Enter name:`);
const salary = +prompt(`Enter  ${name}'s salary:`);

if(salary*1.1 <= 6000){
    console.log(`10% rise! new salary: ${salary * 1.1}`)
}
else{
    console.log(`5% rise! new salary: ${salary * 1.05}`)
}

console.log(`script end`)



//Page 27 ex 2
console.log(`script start`)

const firstNum = +prompt(`Enter first nuber:`);
const secondNum = +prompt(`Enters econd number:`);
let min = 0;
let max = 0;

if(firstNum < secondNum){
    min = firstNum
    max = secondNum
}
else{
    min = secondNum
    max = firstNum
}

while(min <= max){
    console.log(min)
    min++
}

console.log(`script end`)



//Page 27 ex 3
console.log(`script start`)

let firstNum = +prompt(`Enter first nuber:`);
let allEvens = 0;

if(firstNum %2 != 0){
    firstNum = firstNum -1
}

while(allEvens <=  firstNum){
    console.log(allEvens)
    allEvens = allEvens +2
}

console.log(`script end`)



//Page 27 ex 5
console.log(`script start`)

let firstNum = +prompt(`Enter positive nuber:`);
let sum = 0;

while(firstNum != -99 ){
    if(firstNum < 0){
        firstNum = +prompt(`Enter positive nuber:`);
    }
    else{
        sum = sum + firstNum
        firstNum = +prompt(`Enter positive nuber:`);
    }
}

console.log(`sum: ${sum}`)

console.log(`script end`)



//Page 27 ex 6
console.log(`script start`)

let firstNum = +prompt(`Enter positive nuber:`);
let sum = 0;
let len = 0;

while(firstNum != 0 ){
    if(firstNum < 0){
        firstNum = +prompt(`Enter positive nuber:`);
    }
    else{
        sum = sum + firstNum
        len++
        firstNum = +prompt(`Enter positive nuber:`);
    }
}

console.log(`average: ${sum/len}`)

console.log(`script end`)



//Page 27 ex 7
console.log(`script start`)

let firstNum = +prompt(`Enter nuber:`);
let max = 0;

while(firstNum > 0 ){
    if(firstNum > max){
        max = firstNum
    }
    firstNum = +prompt(`Enter nuber:`);
}

console.log(`max: ${max}`)

console.log(`script end`)

*/

//readme assagement
console.log(`script start`)

let producrName = prompt(`Enter name:`);
let producrPrice = +prompt(`Enter price for ${producrName}:`);
let maxPrice = 0;
let maxProduct = "";
let i = 1;

while(i < 5){
    if(producrPrice > maxPrice){
        maxPrice = producrPrice
        maxProduct = producrName
    }
    i++
    producrName = prompt(`Enter name:`);
    producrPrice = +prompt(`Enter price for ${producrName}:`);

}

console.log(`Highest price product: ${maxProduct}, with the price of ${maxPrice}`)

console.log(`script end`)

//git test2221
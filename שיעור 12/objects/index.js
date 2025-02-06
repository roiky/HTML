//page 28 ex 12
/*
console.log(`script start`)

let userNumber = +prompt(`Enter number:`);
let sum = 0;

while(userNumber >= 1){
    sum = sum + parseInt(userNumber%10)
    userNumber = userNumber/10
}

console.log(`sum of number: ${sum}`)

console.log(`script end`)

//////////////
console.log(`script start`)

let userNumber = prompt(`Enter number:`);
let sum = 0;
let NumLen = userNumber.length;

for(let i=0; i<NumLen ; i++){
    sum=sum + parseInt(userNumber[i])

}

console.log(`sum of number: ${sum}`)

console.log(`script end`)

*/

//////////////
//page 28 ex 13

console.log(`script start`)

let userNumber = prompt(`Enter number:`);
const userDig = prompt(`enter a single dig:`)
let NumLen = userNumber.length;
let counter = 0;

if(isNaN(userNumber) || isNaN(userDig) || userDig < 0 || userDig > 9){
    console.log(`error`)
    throw new Error(`Error!`)
}

for(let i=0; i < NumLen ; i++){
    if(userNumber[i] == userDig){
        counter++;
    }

}

console.log(`count of dig: ${counter}`)

console.log(`script end`)
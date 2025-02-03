
/*
//Page 28 Ex 14
console.log(`script start`)

function ReverseNum(num){

    let strNum = num.toString()
    let reverseNum = ""
    
    for(let i = strNum.length -1 ; i >=0 ; i--){
        reverseNum += strNum[i]
    }

    return reverseNum
}

console.log(ReverseNum(125))
console.log(ReverseNum(2584))
console.log(ReverseNum(123456))

console.log(`script end`)

//Page 29 Ex 26

console.log(`script start`)

function numbersBetween(num1, num2){
    allNumbers = []
    for (let index = num1; index <= num2; index++) {
        allNumbers.push(index)
    }

    return allNumbers
}

console.log(...numbersBetween(15,19))
console.log(...numbersBetween(21,67))

console.log(`script end`)



//Page 29 Ex 27

console.log(`script start`)

function numbersBetween(num1, num2){
    
    let minNum = 0
    let maxMun = 0

    if(num1 <= num2){ minNum = num1;maxMun = num2;}
    else{minNum = num2; maxMun = num1 }

    for (let index = minNum; index <= maxMun; index++) { console.log(index) }

    for (let index = maxMun; index >= minNum; index--) { console.log(index) }
}


numbersBetween(67,52)
numbersBetween(10,15)


console.log(`script end`)
*/

//Page 29 Ex 28
let july2000 = [29, 30, 31, 28, 32, 33, 27, 29, 30, 34, 36, 31, 30, 29, 28, 32, 35, 33, 30, 31, 29, 27, 28, 30, 33, 34, 36, 32, 31, 30];
let july2001 = [30, 32, 33, 29, 31, 34, 28, 30, 32, 36, 38, 33, 31, 30, 29, 34, 36, 35, 31, 32, 30, 28, 29, 32, 35, 37, 38, 34, 32, 31];

function calcAverage(arr){
    let sum = 0;

    for (let index = 0; index < arr.length; index++) {
        sum = sum + arr[index]
    }

    return (sum / arr.length).toFixed(2)
}

let avgJuly2000 = calcAverage(july2000);

console.log(`average temp in July 2000: ${avgJuly2000}`)
console.log(`Days above average:`)

for (let index = 0; index < july2001.length; index++) {
    if(july2001[index] > avgJuly2000)
    console.log(`${index} of July 2001 => ${july2001[index]}`)
    
}
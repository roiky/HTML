//
// console.log(carsForRental)

//Q1 - Origin & car Miles_per_Gallon
console.log(`Q1 Start`)

function GetCarByOriginAndMPG(carArr,origin, mpg){
    if(!Array.isArray(carArr) || typeof origin !== 'string' || typeof mpg !== 'number' ) return;

    const CarsResult = [];
    for (let index = 0; index < carArr.length; index++) {
        let CurrentCar = carArr[index];
        if (CurrentCar.Origin === origin && CurrentCar.Miles_per_Gallon === mpg) {
            CarsResult.push(CurrentCar);
        }

        
    }
    return CarsResult;
}

const result = GetCarByOriginAndMPG(carsForRental, "USA", 18);
console.log(result);
console.log(`Q1 End`);

//Q2 - calc AVG HP
console.log(`Q2 Start`);

function calcAvgHP(carsArr){
    if(!Array.isArray(carsArr) ) return;

    let counter = 0;
    let sum = 0;

    for (let index = 0; index < carsArr.length; index++) {
        let CurrentCar = carsArr[index];
        if (CurrentCar.Horsepower) {
            sum = sum + CurrentCar.Horsepower;
            counter++;
        }
    }
    return (sum/counter).toFixed(2);
}
const result2 = calcAvgHP(carsForRental);
console.log(result2);

console.log(`Q2 End`);

//Q3 - property & treshold

console.log(`Q3 Start`);

const PROPERTIES =[ "Miles_per_Gallon","Cylinders","Displacement","Horsepower","Weight_in_lbs","Acceleration" ]



function carsByProperty(carsArr, prop, num){

    if (!Array.isArray(carsArr) || typeof prop !== 'string' || typeof num !== 'number') return;

    if(!PROPERTIES.includes(prop)){ //used ChatGPT for this line otherwise it would be alot of OR to check and it was too long..
        console.log(`please enter valid property!`);
        return;
    }
    const CarsResult = [];

    for (let index = 0; index < carsArr.length; index++) {
        let CurrentCar = carsArr[index];
        if(CurrentCar[prop] <= num){
            CarsResult.push(CurrentCar);
        }
        
    }
    return CarsResult;
}

let carProp = prompt(`please enter a car property:`);
let carTresh = +prompt(`please enter a minimum treshold:`);

const result3 = carsByProperty(carsForRental, carProp, carTresh);
console.log(result3);

console.log(`Q3 End`);

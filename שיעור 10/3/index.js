const carType = prompt(`what is the car type?`)
const carColor = prompt(`what is the car color?`)
const carModel = prompt(`what is the car model?`)

if(carType === 'mazda' 
    && carColor === 'red' 
    && carModel === 'cx5'){
    console.log(`Yes I Found my car!`)
}
else{
    console.log(`I Dont need this car!`)
}
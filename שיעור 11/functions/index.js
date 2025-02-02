console.log(`script start`)

function checkLen(userString){
    if(userString.length > 10){
        console.log(`Too long!`)
    }
    else{
        console.log(`Valid String! [${userString.length}]`)
    }
}

checkLen("123456789101010");
checkLen("hello");

console.log(`script end`)
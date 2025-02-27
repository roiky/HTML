const company = {
    name:"TEST",
    location: "TLV",
    products: [
        {name:"TEST2", price:150},
        {name:"TEST3", price:100},
        {name:"TEST4", price:70},
    ],
    revenue: function(){return "1"}
}

console.log(company)

const shallowCopy = JSON.parse(JSON.stringify(company))
console.log(shallowCopy)

const companyToClone = {...company}
delete companyToClone.revenue
const deepCopy = structuredClone(companyToClone)
console.log(deepCopy)
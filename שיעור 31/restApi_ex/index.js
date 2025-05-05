const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000
app.use(bodyParser.json({ extended: true }))



app.get('/', (req, res) => {
    return res.status(404).json([{ userName: "Talya@gmail.com" }, { userName: "Nicole@gmail.com" }, { userName: "Kalimi@gmail.com" }])
})


// app.get('/customer', (req, res) => {
//     const customerId = req.query?.custid
//     if (customerId) {
//         return res.send(`the customer id you requested is: ${customerId}`)
//     } else {
//         return res.send("No id sent")
//     }

// })


app.get('/add/:num1/:num2', (req, res) => { //path param
    const result = Number(req.params.num1) + Number(req.params.num2)
    res.send(`${req.params.num1}+${req.params.num2} = ${result}`)
})
app.get('/sub/:num1/:num2', (req, res) => { //path param
    const result = Number(req.params.num1) - Number(req.params.num2)
    res.send(`${req.params.num1}-${req.params.num2} = ${result}`)
})
app.get('/mul/:num1/:num2', (req, res) => { //path param
    const result = Number(req.params.num1) * Number(req.params.num2)
    res.send(`${req.params.num1}*${req.params.num2} = ${result}`)
})
app.get('/div/:num1/:num2', (req, res) => { //path param
    const result = Number(req.params.num1) / Number(req.params.num2)
    res.send(`${req.params.num1}/${req.params.num2} = ${result}`)
})






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
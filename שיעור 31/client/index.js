const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
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

app.get('/customers', (req, res) => {
    res.json(["customer1", "customer1", "customer1", "customer1", "customer1"])
})
app.get('/customer/filter', (req, res) => { //path param
    res.send("Filter by query params")
})
app.get('/customer/:id', (req, res) => { //path param
    res.send(`REST-the requested id is ${req.params.id}`)
})
app.delete('/customer/:id', (req, res) => { //path param
    res.send(`REST-the requested id to delete is ${req.params.id}`)
})
app.put('/customer/:id', (req, res) => { //path param + body
    console.log(req.body)
    res.send(`REST - update customer ${req.params.id}, ${JSON.stringify(req.body)}`)
})
app.post('/customer', (req, res) => { //only body
    console.log(req.body)
    res.send(`REST-create new customer, ${JSON.stringify(req.body)}`)
})

app.get('/add/:num1/:num2', (req, res) => {
    res.send(`the result is: ${parseInt(req.params.num1) + parseInt(req.params.num2)}`)
})

app.get('/sub/:num1/:num2', (req, res) => {
    res.send(`the result is: ${parseInt(req.params.num1) - parseInt(req.params.num2)}`)
})

app.get('/div/:num1/:num2', (req, res) => {
    res.send(`the result is: ${parseInt(req.params.num1) / parseInt(req.params.num2)}`)
})

app.get('/mul/:num1/:num2', (req, res) => {
    res.send(`the result is: ${parseInt(req.params.num1) * parseInt(req.params.num2)}`)
})




app.get('/customer/score/:scorenum', (req, res) => {
    res.send(`REST-the requested score is ${req.params.scorenum}`)
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
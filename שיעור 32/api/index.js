//library => express (for HTTP)

console.log("start-test")

const express = require("express")
const config = require("./config")
console.log(config)

const app = express()

app.get("/api/health-check", (req, res, next) => {
    console.log(req.query) //to print the query params
    res.send("Server is UP and running!")
})

// http://localhost:3000/api/token/?token=t1234 => STATUS:200
// http://localhost:3000/api/token/?token=t12345 => STATUS:401


app.get("/api/token", (req, res, next) => { 
    const token = req?.query?.token

    if(token === "t1234"){
        return res.send("User Auth")
    }
    else{
        return res.status(401).send("User Unauth")
    }

})

const users = []
app.get("/api/register", (req, res, next) => { 
    const username = req?.query?.username
    const password = req?.query?.password

    if(username && password){
        users.push({username,password})
        res.send("User Registered")
        return console.log(users)
    }
    else{
        return res.status(400).send("missing USERNAME or PASSWORD")
    }

})

app.get("/api/users", (req, res, next) => { 
    res.json(users)
})

app.listen(config.port, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log(`listening to PORT: ${config.port}`)
    }
})

console.log("server started")
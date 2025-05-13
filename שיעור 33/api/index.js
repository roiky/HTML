const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const config = require("./config")
console.log(config)

const app = express()
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request Started ${req.originalUrl} `)
    next()
})

// app.use((req, res, next) => {
//     console.log("I am in a BAD middleware")
//     return res.send("BAD MIDDLEWARE")
// })

app.get("/api/health-check", (req, res, next) => {
    console.log(req.query)
    res.send("Server is up and running")
})
// http://localhost:3000/api/authenticate?token=t12345 => 401
//http://localhost:3000/api/authenticate?token=t1234 => 200 
app.get("/api/authenticate", (req, res, next) => {
    const token = req?.query?.token
    if (token === "t1234") {
        return res.send("User Authorized")
    } else {
        return res.status(401).send("Sorry User is not Authorized")
    }
})
const users = []
const tokens = {}

// TODO: change get to post
app.post("/auth/register", (req, res, next) => {
    const userName = req.body.userName
    const password = req.body.password
    if (userName && password) {
        users.push({ userName, password })
        return res.send("User registered successfully")
    } else {
        return res.status(400).send("Missing UserName or Password")
    }
})
// TODO: change get to post
app.post("/auth/login", (req, res, next) => {
    const userName = req.body.userName // plain text
    const password = req.body.password
    console.log(userName, password)
    if (userName && password) {
        const foundUser = users.find(u => u.userName === userName.toLowerCase() && u.password === password.toLowerCase())
        if (foundUser) {
            const token = `kalimi-token-${new Date().getTime()}`
            tokens[token] = {
                exp: Date.now() + 10 * 1000
            }
            console.log(tokens)
            return res.json({ message: "Logged in Successfully", token })
        } else {
            return res.json({ message: "Wrong username or password!", })
        }

    } else {
        return res.status(400).send("Missing Username or Password")
    }
})

app.use((req, res, next) => {
    const currToken = req.headers.authorization
    if (tokens.hasOwnProperty(currToken)) {
        if(tokens[currToken].exp > Date.now()){
            console.log(tokens)
            return next()
        }else{
            delete tokens[currToken];
            console.log(tokens)
            return res.status(401).json({ message: "token expired" })
        }
        
    } else {
        console.log(tokens)
        return res.status(401).json({ message: "who are you?" })
    }
    
})
app.get("/api/users", (req, res, next) => {
    return res.json(users)
})
app.get("/api/tokens", (req, res, next) => {
    return res.json(tokens)
})


app.listen(config.port, (e) => {
    if (e) {
        console.log(e)
    } else {
        console.log(`Listening to PORT: ${config.port}`)
    }
})
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

const users = [];

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]: ${req.baseUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to my API!");
});

//function that validate that it recived username or password, later i will use it as a middleware
function validateCredentials(req, res, next) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return next(new Error("Missing"));
    }
    next();
}

app.post("/register", validateCredentials, (req, res, next) => {
    const { userName, password } = req.body;
    // const userName = req.body.userName;
    // const password = req.body.password;
    // if (!userName || !password) {
    //     return next(new Error("Missing"));
    // }

    const userExists = users.find((user) => user.userName === userName);
    if (userExists) {
        return next(new Error("userExist"));
    }

    users.push({ userName, password });
    res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", validateCredentials, (req, res, next) => {
    const { userName, password } = req.body;
    // const userName = req.body.userName;
    // const password = req.body.password;
    // if (!userName || !password) {
    //     return next(new Error("Missing"));
    // }

    const validUser = users.find((user) => user.userName === userName && user.password === password);
    if (validUser) {
        res.status(200).json({ message: `${userName} logged in successfully!` });
    } else {
        return next(new Error("failedLogin"));
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`API is running on port: ${PORT}`);
    }
});

//error middleware
app.use((error, req, res, next) => {
    switch (error.message) {
        case "Missing": {
            return res.status(401).json({ message: "Missing username or password!" });
        }
        case "userExist": {
            return res.status(401).json({ message: "User already exist!" });
        }
        case "failedLogin": {
            return res.status(401).json({ message: "Wrong username or password!" });
        }
        default: {
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }
});

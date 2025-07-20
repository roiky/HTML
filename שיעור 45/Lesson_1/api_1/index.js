const express = require("express");
const PORT = 3000;
const app = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]: ${req.baseUrl}`);
    next();
});

app.get("/hc", (req, res, next) => {
    const queryParams = req.params;
    res.json({ message: "api is up!" });
});

//token middleware
app.use((req, res, next) => {
    const userToken = req.query.key;
    if (userToken === "token") {
        return next();
    } else {
        return res.status(500).send("Unauthorized!");
    }
});

app.get("/users", (req, res, next) => {
    res.json([
        { id: 1, name: "Liam Cohen", email: "liam.cohen@example.com", age: 29 },
        { id: 2, name: "Noa Levi", email: "noa.levi@example.com", age: 24 },
        { id: 3, name: "Daniel Azulay", email: "daniel.azulay@example.com", age: 34 },
        { id: 4, name: "Maya Ben-David", email: "maya.ben.david@example.com", age: 31 },
        { id: 5, name: "Yonatan Peretz", email: "yonatan.peretz@example.com", age: 27 },
        { id: 6, name: "Tamar Shalom", email: "tamar.shalom@example.com", age: 22 },
        { id: 7, name: "Itay Mizrahi", email: "itay.mizrahi@example.com", age: 30 },
        { id: 8, name: "Shira Avraham", email: "shira.avraham@example.com", age: 26 },
        { id: 9, name: "Eitan Mor", email: "eitan.mor@example.com", age: 33 },
        { id: 10, name: "Yael Gold", email: "yael.gold@example.com", age: 28 },
    ]);
});

//search middleware
app.use((req, res, next) => {
    const userID = req.query.id;
    if (userID) {
        return next();
    } else {
        return next(new Error("BAD-REQUEST"));
    }
});

app.get("/search", (req, res, next) => {
    res.send("search page response");
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
        case "UNAUTH": {
            return res.status(401).send("Unauthorized___");
        }
        case "BAD-REQUEST": {
            return res.status(400).send("Bad Request!!");
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America");
        }
    }
});

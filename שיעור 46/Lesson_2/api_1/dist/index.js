"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
const checkApiKey_1 = __importDefault(require("./middlewares/checkApiKey"));
const logDuration_1 = __importDefault(require("./middlewares/logDuration"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(rateLimiter_1.default);
app.use(logDuration_1.default);
app.get("/protected", checkApiKey_1.default, (req, res, next) => {
    res.send("You're in!!");
});
//[=================================================================================]
//API LISTENER
app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log(`API is running on port: ${PORT}`);
    }
});
//error middleware
app.use((error, req, res, next) => {
    switch (error.message) {
        case "WRONG-TOKEN": {
            return res.status(401).send("Unauthorized => Wrong Token!");
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America");
        }
    }
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_token_1 = __importDefault(require("./middleware/api.token"));
const requestDuration_1 = __importDefault(require("./middleware/requestDuration"));
const rateLimiter_1 = __importDefault(require("./middleware/rateLimiter"));
const auth_1 = __importDefault(require("./controllers/auth"));
const httpStatus_1 = require("./enum/httpStatus");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(requestDuration_1.default);
app.use(api_token_1.default);
app.use(rateLimiter_1.default);
app.get("/hc", (req, res, next) => {
    res.send("Api is Running");
});
app.use("/auth", auth_1.default);
app.use((error, req, res, next) => {
    console.log(error.message);
    switch (error.message) {
        case httpStatus_1.ERRORS.BAD_REQUEST: {
            return res.status(400).send("Bad Request");
        }
        case httpStatus_1.ERRORS.UNAUTH: {
            return res.status(401).send("Unauthorized___");
        }
        case httpStatus_1.ERRORS.EXIST: {
            return res.status(401).send("Username taken!");
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America");
        }
    }
});
app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    }
    else {
        console.log(`Api is running on port ${PORT}`);
    }
});

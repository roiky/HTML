"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const httpStatus_1 = require("./enum/httpStatus");
const logger_1 = __importDefault(require("./logger"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use("/auth", auth_routes_1.default);
app.get("/hc", (req, res, next) => {
    res.status(200).send("Api is Running!!!");
});
app.use((error, req, res, next) => {
    switch (error.message) {
        case httpStatus_1.ERRORS.BAD_REQUEST: {
            return res.status(400).send("Bad Request");
        }
        case httpStatus_1.ERRORS.UNAUTH: {
            return res.status(401).send("Unauthorized___");
        }
        default: {
            return res.status(500).send("Something went wrong! contact Roei Kalimi and report it!");
        }
    }
});
app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger_1.default.error(`Api is running on port ${PORT}!!!`);
    }
    else {
        logger_1.default.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});
exports.default = app;

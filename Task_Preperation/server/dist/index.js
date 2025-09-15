"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const httpStatus_1 = require("./enum/httpStatus");
const logger_1 = __importDefault(require("./logger"));
const cors_1 = __importDefault(require("cors"));
const lecturers_1 = __importDefault(require("./controllers/lecturers"));
const getLecturers_1 = require("./controllers/lecturers/getLecturers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/lecturers", lecturers_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/hc", (req, res, next) => {
    res.send("Api is Running!!");
});
app.get("/checkDB", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, getLecturers_1.getLevels)();
        return res.json({ data: result });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
// app.use("/auth", authRouter);
// app.use("/gov-il-data", govILRouter);
// app.use("/uploader", uploaderRouter);
// app.use(authorizationMiddleware); // all the routers below protected!!!
// app.use("/api/expenses", expensesRouter);
// app.use("/api/orders", ordersRouter);
app.use((error, req, res, next) => {
    logger_1.default.error(`${error.message} reqeustId: ${req.requestId}`);
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

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
const api_token_1 = __importDefault(require("./middleware/api.token"));
const requestDuration_1 = __importDefault(require("./middleware/requestDuration"));
const rateLimiter_1 = __importDefault(require("./middleware/rateLimiter"));
const auth_1 = __importDefault(require("./controllers/auth"));
const expenses_1 = __importDefault(require("./controllers/expenses"));
const govIlData_1 = __importDefault(require("./controllers/govIlData"));
const uploader_1 = __importDefault(require("./controllers/uploader"));
const path_1 = __importDefault(require("path"));
const httpStatus_1 = require("./enum/httpStatus");
const authorizationMiddleware_1 = __importDefault(require("./middleware/authorizationMiddleware"));
const logger_1 = __importDefault(require("./logger"));
const addRequestId_1 = __importDefault(require("./middleware/addRequestId"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
// setTimeout(async () => {
//     const result = await (await getConnection()).query("select * from customers")
//     console.log(result)
// }, 5000);
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, db_1.default)();
        console.log("✅ MySQL connection successful!");
        // בדיקה שה־DB הנכון בשימוש
        const [db] = yield conn.query("SELECT DATABASE() AS db");
        console.log("Using DB:", db[0].db);
        // הרצת שאילתה והדפסת התוצאות
        const [rows] = yield conn.query("SELECT * FROM northwind.users LIMIT 10");
        console.table(rows); // מציג יפה את השורות בקונסול
    }
    catch (err) {
        console.error("❌ MySQL connection failed:", (err === null || err === void 0 ? void 0 : err.sqlMessage) || (err === null || err === void 0 ? void 0 : err.message) || err);
    }
}))();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(addRequestId_1.default);
app.use(requestDuration_1.default);
app.use(api_token_1.default);
app.use(rateLimiter_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/", (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.get("/hc", (req, res, next) => {
    res.send("Api is Running");
});
app.use("/auth", auth_1.default);
app.use("/gov-il-data", govIlData_1.default);
app.use("/uploader", uploader_1.default);
app.use("/api/expenses", expenses_1.default);
app.use(authorizationMiddleware_1.default); // all the routers below protected!!!
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
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America");
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

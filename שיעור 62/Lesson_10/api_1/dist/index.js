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
const user_1 = __importDefault(require("./controllers/user"));
const govIlData_1 = __importDefault(require("./controllers/govIlData"));
const uploader_1 = __importDefault(require("./controllers/uploader"));
const path_1 = __importDefault(require("path"));
const httpStatus_1 = require("./enum/httpStatus");
const authorizationMiddleware_1 = __importDefault(require("./middleware/authorizationMiddleware"));
const logger_1 = __importDefault(require("./logger"));
const addRequestId_1 = __importDefault(require("./middleware/addRequestId"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
(0, db_1.default)();
// setTimeout(async () => {
//     const result = await (await getConnection()).query("select * from customers")
//     console.log(result)
// }, 30000);
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
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
app.get("/hc", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ((_a = (yield (0, db_1.default)())) === null || _a === void 0 ? void 0 : _a.execute("select * from northwind.customers", []));
    console.log(`\x1b[31m HEALTH_CHECK \x1b[0m`);
    res.send("Api is Running___" + (result === null || result === void 0 ? void 0 : result.length));
}));
app.use("/auth", auth_1.default);
app.use("/gov-il-data", govIlData_1.default);
app.use("/uploader", uploader_1.default);
app.use(authorizationMiddleware_1.default); // all the routers below protected!!!
app.use("/api/expenses", expenses_1.default);
app.use("/api/user", user_1.default);
app.use((error, req, res, next) => {
    logger_1.default.error(`${error.message} reqeustId: ${req.requestId}`);
    console.log(error);
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
const httpServer = http_1.default.createServer(app);
httpServer.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger_1.default.error(`Api is running on port ${PORT}!!!`);
    }
    else {
        logger_1.default.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});
const userNamesSessions = {};
const io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    socket.on("sendMessage", (msg) => {
        console.log("do something with the msg", msg);
        io.emit("messageFromApi", (userNamesSessions[socket.id] || "NoUser") + "=>" + msg);
    });
    socket.on("connectUserName", (userName) => {
        console.log("Connecting User Name", userName, socket.id);
        userNamesSessions[socket.id] = userName;
        console.log(userNamesSessions);
    });
    socket.on("disconnectUser", (msg) => {
        console.log("User requested logout:", userNamesSessions[socket.id]);
        delete userNamesSessions[socket.id];
        socket.disconnect(true);
    });
    // ??
});
io.on("disconnect", (reason) => {
    const username = userNamesSessions.get(socket.id);
    if (username) {
        // הסר מה-maps
        userNamesSessions.delete(socket.id);
        const set = userSockets.get(username);
        if (set) {
            set.delete(socket.id);
            if (set.size === 0)
                userSockets.delete(username);
        }
        // עדכן presence, שלח הודעה לאחרים, וכו'
        console.log("User disconnected", username, socket.id, "reason:", reason);
    }
    else {
        console.log("Socket disconnected (no username)", socket.id, "reason:", reason);
    }
    // ניקוי נוסף: timers, listeners מותאמים, וכו' — אם יש
});

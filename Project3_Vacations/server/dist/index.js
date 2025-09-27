"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const vacations_routes_1 = __importDefault(require("./routes/vacations.routes"));
const vacations_admin_routes_1 = __importDefault(require("./routes/vacations.admin.routes"));
const reports_routes_1 = __importDefault(require("./routes/reports.routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.use("/auth", auth_routes_1.default);
app.use("/vac", vacations_routes_1.default);
app.use("/admin", vacations_admin_routes_1.default);
app.use("/reports", reports_routes_1.default);
app.get("/hc", (req, res, next) => {
    res.status(200).send("Vacations API is running!");
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

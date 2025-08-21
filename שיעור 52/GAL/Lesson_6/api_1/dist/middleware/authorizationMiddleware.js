"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authorizationMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Example of token api validation, not production
function authorizationMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1] // מחלץ רק את הטוקן
        : authHeader;
    if (!token || typeof token !== "string") {
        return next(new Error("UNAUTH"));
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET, function (err, data) {
        if (err)
            return next(new Error("UNAUTH"));
        const { isAdmin, userName } = data;
        req.userClaims = { isAdmin, userName };
        return next();
    });
}

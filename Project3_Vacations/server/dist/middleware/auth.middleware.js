"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireAdmin = requireAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
function requireAuth(req, res, next) {
    var _a, _b;
    try {
        const authHeader = req.headers.authorization || "";
        if (!authHeader)
            return res.status(401).json({ message: "Unauthorized - missing auth header" });
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
        if (!token)
            return res.status(401).json({ message: "Unauthorized - missing token" });
        const secret = process.env.JWT_SECRET || "secret";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const userId = typeof decoded === "object" && decoded !== null
            ? (_b = (_a = decoded.userId) !== null && _a !== void 0 ? _a : decoded.user_id) !== null && _b !== void 0 ? _b : decoded.id
            : undefined;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - token missing userId" });
        }
        req.userId = Number(userId);
        req.user = decoded;
        next();
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
}
function requireAdmin(req, res, next) {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Admin role required" });
    next();
}

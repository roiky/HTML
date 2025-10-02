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
        console.log(authHeader);
        if (!authHeader)
            return res.status(401).json({ message: "Unauthorized - missing auth header" });
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
        if (!token)
            return res.status(401).json({ message: "Unauthorized - missing token" });
        const secret = process.env.JWT_SECRET || "secret";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        const maybeUserId = (_b = (_a = decoded === null || decoded === void 0 ? void 0 : decoded.userId) !== null && _a !== void 0 ? _a : decoded === null || decoded === void 0 ? void 0 : decoded.user_id) !== null && _b !== void 0 ? _b : decoded === null || decoded === void 0 ? void 0 : decoded.id;
        if (maybeUserId)
            req.userId = Number(maybeUserId);
        next();
    }
    catch (error) {
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

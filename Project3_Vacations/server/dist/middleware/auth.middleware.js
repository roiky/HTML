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
    const authHeader = req.headers.authorization || req.headers["Authorization"];
    if (!authHeader)
        return res.status(401).json({ message: "Missing Authorization header" });
    const token = typeof authHeader === "string" ? (authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader) : "";
    if (!token)
        return res.status(401).json({ message: "Missing token" });
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
function requireAdmin(req, res, next) {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Admin role required" });
    next();
}

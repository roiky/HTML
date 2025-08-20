"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidToken = createValidToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createValidToken(userName = "test@gmail.com", isAdmin = true) {
    const secret = process.env.SECRET || "secret";
    const token = jsonwebtoken_1.default.sign({ userName, isAdmin }, secret, { expiresIn: "1m" });
    return token;
}

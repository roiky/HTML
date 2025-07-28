"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = jwtProtected;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
function jwtProtected(req, res, next) {
    const token = req.headers["authorization"];
    //const token = const authHeader = req.body.key;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET, function (err, data) {
            if (err)
                return next(new Error("Error JWT"));
            else {
                const { isAdmin, userName } = data;
                req.userClaims = { isAdmin, userName };
                return next();
            }
        });
    }
    else {
        return next(new Error("Error JWT"));
    }
}

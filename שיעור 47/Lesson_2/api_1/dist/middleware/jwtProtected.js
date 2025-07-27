"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = jwtProtected;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const httpStatus_1 = require("../enum/httpStatus");
dotenv_1.default.config();
const router = express_1.default.Router();
function jwtProtected(req, res, next) {
    const authHeader = req.headers.authorization;
    //const authHeader = req.body.key;
    if (!authHeader) {
        throw new Error(httpStatus_1.ERRORS.BAD_REQUEST);
    }
    else {
        //const isVerified = jwt.verify(authHeader,process.env.SECRET as string, )
        return next();
    }
}

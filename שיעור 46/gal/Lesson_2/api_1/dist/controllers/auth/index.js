"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const loginHandler_1 = require("./loginHandler");
const httpStatus_1 = require("../../enum/httpStatus");
const z = __importStar(require("zod"));
const router = express_1.default.Router();
const User = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
});
exports.users = [{ userName: "admin@gmail.com", password: "admin", phone: "0504085212", age: 30 }];
function loginInputValidation(req, res, next) {
    const validation = User.safeParse(req.body);
    if (!validation.success) {
        console.log(validation);
        throw new Error(httpStatus_1.ERRORS.BAD_REQUEST);
    }
    else {
        next();
    }
}
const registerSchema = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
    phone: z.string().regex(/^05\d{8}$/),
    age: z.number().int().min(0).max(99),
});
function registerInputValidation(req, res, next) {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        console.log(validation);
        throw new Error(httpStatus_1.ERRORS.BAD_REQUEST);
    }
    else {
        next();
    }
}
router.post("/login", loginInputValidation, (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const foundUser = (0, loginHandler_1.login)({ userName, password });
        if (foundUser)
            return res.json({ message: "User logged in successfully" });
        else
            throw new Error(httpStatus_1.ERRORS.UNAUTH);
    }
    catch (error) {
        console.log(error);
        return next(new Error(error.message));
    }
});
router.post("/register", registerInputValidation, (req, res, next) => {
    try {
        const { userName, password, phone, age } = req.body;
        const userExist = exports.users.find((u) => u.userName === userName);
        if (userExist) {
            throw new Error(httpStatus_1.ERRORS.EXIST);
        }
        exports.users.push({ userName, password, phone, age });
        return res.json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(error);
        return next(new Error(error.message));
    }
});
exports.default = router;

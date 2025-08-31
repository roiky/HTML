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
const getUserDetails_1 = require("./getUserDetails");
const logger_1 = __importDefault(require("../../logger"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get("/details", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield (0, getUserDetails_1.getUserDetails)(userId);
        return res.json(result);
    }
    catch (error) {
        logger_1.default.error(error.message);
        return next(new Error("error when getting user details"));
    }
}));
exports.default = router;

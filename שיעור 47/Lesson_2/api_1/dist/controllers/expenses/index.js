"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwtProtected_1 = __importDefault(require("../../middleware/jwtProtected"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get("/", jwtProtected_1.default, (req, res, next) => {
    res.json({ message: "i am protected!!!" });
});
exports.default = router;

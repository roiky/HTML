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
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let pool = null;
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!pool) {
            pool = promise_1.default.createPool({
                host: process.env.DB_HOST || "localhost",
                user: process.env.DB_USER || process.env.USER || "root",
                password: process.env.DB_PASSWORD || process.env.PASSWORD || "root",
                database: process.env.DB_NAME || process.env.DATABASE || "vacations_app",
                port: Number(process.env.DB_PORT || 3306),
                connectionLimit: 10,
                waitForConnections: true,
            });
        }
        return pool;
    });
}
exports.default = getConnection;

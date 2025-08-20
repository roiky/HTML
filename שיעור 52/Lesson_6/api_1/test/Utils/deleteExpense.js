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
exports.deleteExpenseById = deleteExpenseById;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function deleteExpenseById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield promise_1.default.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                port: Number(process.env.DB_PORT) || 3306,
            });
            yield conn.execute(`DELETE FROM northwind.expenses WHERE id = ?`, [id]);
            yield conn.end();
        }
        catch (error) {
            console.error(`error for ID ${id}:`, error);
        }
    });
}

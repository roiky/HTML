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
exports.login = login;
const db_1 = __importDefault(require("../../db"));
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        const email = (user.userName || "").toLowerCase().trim();
        const params = [email, user.password];
        const [rows] = yield conn.execute(getLoginQuery(), params);
        if (Array.isArray(rows) && rows.length > 0) {
            const foundUser = rows[0];
            console.log("✅ Found user:", foundUser);
            return foundUser;
        }
        else {
            console.log("❌ No user found");
        }
        return undefined;
    });
}
const getLoginQuery = () => `
  SELECT *
  FROM northwind.users
  WHERE LOWER(email) = ? AND password = ?
  LIMIT 1
`;

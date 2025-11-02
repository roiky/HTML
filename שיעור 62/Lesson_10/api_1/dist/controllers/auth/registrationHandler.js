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
exports.register = register;
const db_1 = __importDefault(require("../../db"));
// INSERT INTO`northwind`.`users`(`email`, `password`, `age`, `address`) VALUES('nerya@gmail.com', 'test1122', '25', 'eilat');
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const params = [user.userName, user.password, user.age, user.phone];
        const result = yield ((_a = (yield (0, db_1.default)())) === null || _a === void 0 ? void 0 : _a.execute(getRegisterQuery(), params));
        console.log(result);
        // @ts-ignore 
        if (result[0].insertId)
            return true;
        else
            return false;
    });
}
const getRegisterQuery = () => {
    return `INSERT INTO northwind.users (email, password, age, address) VALUES (?,?,?,?);`;
};

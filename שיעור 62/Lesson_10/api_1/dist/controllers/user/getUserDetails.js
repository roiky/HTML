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
exports.getUserDetails = getUserDetails;
const db_1 = __importDefault(require("../../db"));
function getUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const queryResult = yield ((_a = (yield (0, db_1.default)())) === null || _a === void 0 ? void 0 : _a.execute(getQuery(), [userId]));
        //@ts-ignore
        return queryResult[0][0];
    });
}
const getQuery = () => {
    return `SELECT 
            u.email, u.id, r.role
        FROM
            northwind.users as u
                JOIN
            users_roles as r ON u.id = r.user_id
        WHERE
        u.id = ?`;
};

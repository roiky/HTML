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
exports.default = getOrders;
const db_1 = __importDefault(require("../../db"));
function getOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        const getOrdersQuery = `SELECT 
    o.id,
    CONCAT(emp.first_name, ' ', emp.last_name) AS 'employeeName',
    CONCAT(c.first_name, ' ', c.last_name) AS 'customerName',
    o.shipping_fee,
    o.ship_city
FROM
    northwind.orders AS o
        INNER JOIN
    employees AS emp ON emp.id = o.employee_id
        INNER JOIN
    customers AS c ON c.id = o.customer_id`;
        const [rows] = yield conn.execute(getOrdersQuery, []);
        return rows;
    });
}

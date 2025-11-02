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
let retriesConnections = 5;
let numberOfRetry = 0;
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connections = yield promise_1.default.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                port: Number(process.env.DB_PORT) || 3306,
                connectionLimit: 10,
            });
            const g = yield connections.getConnection();
            yield g.ping();
            console.log('✅ MySQL pool connected successfully.');
            return connections;
        }
        catch (error) {
            yield new Promise(resolve => setTimeout(resolve, 10000));
            if (numberOfRetry !== retriesConnections) {
                console.log("+++++++++++++++++++++++++++++++++");
                console.log("+++++++++++++++++++++++++++++++++");
                numberOfRetry++;
                getConnection();
            }
            else {
                console.log("==================");
                console.log("==================");
                process.exit(1);
            }
            console.log(error);
        }
    });
}
exports.default = getConnection;

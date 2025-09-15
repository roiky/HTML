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
exports.default = getLecturers;
exports.getLevels = getLevels;
const db_1 = __importDefault(require("../../db"));
function getLecturers() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        const getLecturersDetails = `
        SELECT 
        l.id,
        l.first_name,
        l.last_name,
        l.age,
        l.course_count,
        l.email,
        kn.levelName AS n8n_level,
        kf.levelName AS fullstack_level,
        ka.levelName AS ai_level,
        km.levelName AS mysql_level,
        l.created_at
    FROM lecturer_management.lecturer l
    LEFT JOIN lecturer_management.knowledgeLevel kn 
        ON l.level_n8n = kn.levelID
    LEFT JOIN lecturer_management.knowledgeLevel kf 
        ON l.level_fullstack = kf.levelID
    LEFT JOIN lecturer_management.knowledgeLevel ka 
        ON l.level_AI = ka.levelID
    LEFT JOIN lecturer_management.knowledgeLevel km 
        ON l.level_MySQL = km.levelID;
    `;
        const [rows] = yield conn.execute(getLecturersDetails, []);
        return rows;
    });
}
function getLevels() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        const sql = `SELECT DISTINCT levelName FROM lecturer_management.knowledgeLevel`;
        const [rows] = yield conn.execute(sql);
        return rows.map((r) => r.levelName);
    });
}

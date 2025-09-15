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
exports.getLecturers = getLecturers;
exports.getLevels = getLevels;
exports.getLevelIdByName = getLevelIdByName;
exports.updateLecturerKnowledgeById = updateLecturerKnowledgeById;
exports.isEmailExists = isEmailExists;
exports.createLecturer = createLecturer;
const db_1 = __importDefault(require("../db"));
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
        const sql = `SELECT levelID, levelName FROM lecturer_management.knowledgeLevel`;
        const [rows] = yield conn.execute(sql);
        return rows.map((r) => ({
            levelID: r.levelID,
            levelName: r.levelName,
        }));
    });
}
function getLevelIdByName(levelName) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        const [rows] = yield conn.execute("SELECT levelID FROM lecturer_management.knowledgeLevel WHERE levelName = ?", [
            levelName,
        ]);
        return rows.length ? rows[0].levelID : null;
    });
}
function updateLecturerKnowledgeById(id, column, // EXAMPLE: "level_AI"
levelId // EXAMPLE: 3
) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        const [res] = yield conn.execute(`UPDATE lecturer_management.lecturer SET ${column} = ? WHERE id = ?`, [levelId, id]);
        return res.affectedRows;
    });
}
function isEmailExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const conn = yield (0, db_1.default)();
        const sql = `SELECT COUNT(*) as count FROM lecturer_management.lecturer WHERE email = ?`;
        const [rows] = yield conn.execute(sql, [email]);
        const count = (_b = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0;
        return count > 0;
    });
}
function createLecturer(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        // אימייל ייחודי
        if (yield isEmailExists(payload.email)) {
            const err = new Error("Email already exists");
            err.code = "EMAIL_EXISTS";
            throw err;
        }
        // כל הדומיינים יקבלו levelID = 1 ("No knowledge")
        const defaultLevelId = 1;
        const sql = `
    INSERT INTO lecturer_management.lecturer (
      first_name, last_name, age, course_count, email, created_at,
      level_n8n, level_fullstack, level_AI, level_MySQL
    )
    VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)
  `;
        const [res] = yield conn.execute(sql, [
            payload.first_name,
            payload.last_name,
            payload.age,
            payload.course_count,
            payload.email,
            defaultLevelId,
            defaultLevelId,
            defaultLevelId,
            defaultLevelId,
        ]);
        return res.insertId;
    });
}

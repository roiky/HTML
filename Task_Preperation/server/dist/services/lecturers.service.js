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
exports.getLevelIdByName = getLevelIdByName;
exports.updateLecturerKnowledgeById = updateLecturerKnowledgeById;
const db_1 = __importDefault(require("../db"));
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

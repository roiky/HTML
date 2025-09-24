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
exports.getAllVacations = getAllVacations;
exports.getActiveVacations = getActiveVacations;
exports.getUpcomingVacations = getUpcomingVacations;
exports.getFollowedVacations = getFollowedVacations;
exports.followVacation = followVacation;
exports.unfollowVacation = unfollowVacation;
const db_1 = __importDefault(require("../db"));
function getVacationsBase(sqlParams) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const page = Math.max(1, Number((_a = sqlParams.page) !== null && _a !== void 0 ? _a : 1));
        const pageSize = Math.max(1, Math.min(100, Number((_b = sqlParams.pageSize) !== null && _b !== void 0 ? _b : 10)));
        const offset = (page - 1) * pageSize;
        const whereSql = sqlParams.whereClause && sqlParams.whereClause.trim() ? `WHERE ${sqlParams.whereClause}` : "";
        const baseParams = Array.isArray(sqlParams.whereParams) ? [...sqlParams.whereParams] : [];
        const conn = yield (0, db_1.default)();
        const countSql = `SELECT COUNT(*) AS cnt FROM vacations v ${whereSql}`;
        const [countRows] = yield conn.execute(countSql, baseParams);
        const total = Number((_d = (_c = countRows[0]) === null || _c === void 0 ? void 0 : _c.cnt) !== null && _d !== void 0 ? _d : 0);
        const safeUserId = sqlParams.userId != null ? Number(sqlParams.userId) : 0; // to fix a bug when invalid userID broke the app
        const selectSql = `
    SELECT
      v.vacation_id,
      v.destination,
      v.description,
      v.start_date,
      v.end_date,
      v.price,
      v.image_name,
      (SELECT COUNT(*) FROM followers f WHERE f.vacation_id = v.vacation_id) AS followers_count,
      EXISTS (SELECT 1 FROM followers f2 WHERE f2.vacation_id = v.vacation_id AND f2.user_id = ?) AS is_following
    FROM vacations v
    ${whereSql}
    ORDER BY v.start_date ASC
    LIMIT ${pageSize} OFFSET ${offset}
  `;
        const selectParams = [...baseParams, safeUserId];
        const [rows] = yield conn.execute(selectSql, selectParams);
        const mapped = (rows || []).map((r) => {
            var _a;
            return ({
                vacation_id: r.vacation_id,
                destination: r.destination,
                description: r.description,
                start_date: r.start_date,
                end_date: r.end_date,
                price: Number(r.price),
                image_name: r.image_name,
                followers_count: Number((_a = r.followers_count) !== null && _a !== void 0 ? _a : 0),
                is_following: r.is_following ? 1 : 0,
            });
        });
        return { rows: mapped, total, page, pageSize };
    });
}
/* ---------- now use "getVacationsBase" to get all kinds of filters  ---------- */
function getAllVacations(args) {
    return __awaiter(this, void 0, void 0, function* () {
        return getVacationsBase(Object.assign({ whereClause: "", whereParams: [] }, args));
    });
}
function getActiveVacations(args) {
    return __awaiter(this, void 0, void 0, function* () {
        return getVacationsBase(Object.assign({ whereClause: "v.start_date <= NOW() AND v.end_date >= NOW()", whereParams: [] }, args));
    });
}
function getUpcomingVacations(args) {
    return __awaiter(this, void 0, void 0, function* () {
        return getVacationsBase(Object.assign({ whereClause: "v.start_date > NOW()", whereParams: [] }, args));
    });
}
function getFollowedVacations(args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!args.userId) {
            const err = new Error("userId is required for getFollowedVacations");
            //err.code = "MISSING_USER";
            throw err;
        }
        return getVacationsBase(Object.assign({ whereClause: "EXISTS (SELECT 1 FROM followers f2 WHERE f2.vacation_id = v.vacation_id AND f2.user_id = ?)", whereParams: [args.userId] }, args));
    });
}
function followVacation(userId, vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        yield conn.execute(`INSERT IGNORE INTO followers (user_id, vacation_id) VALUES (?, ?)`, [userId, vacationId]);
    });
}
function unfollowVacation(userId, vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, db_1.default)();
        yield conn.execute(`DELETE FROM followers WHERE user_id = ? AND vacation_id = ?`, [userId, vacationId]);
    });
}

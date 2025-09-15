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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewLecturer = postNewLecturer;
const lecturers_service_1 = require("../../services/lecturers.service");
const zodSchemas_1 = require("../../utils/zodSchemas");
function postNewLecturer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsed = zodSchemas_1.CreateLecturerSchema.parse(req.body);
            const { first_name, last_name, email, age, course_count } = parsed;
            const insertId = yield (0, lecturers_service_1.createLecturer)({
                first_name,
                last_name,
                email,
                age,
                course_count,
            });
            return res.status(201).json({ id: insertId, message: "Lecturer created" });
        }
        catch (err) {
            if ((err === null || err === void 0 ? void 0 : err.name) === "ZodError") {
                return res.status(400).json({ message: "Validation error", details: err.errors });
            }
            if ((err === null || err === void 0 ? void 0 : err.code) === "EMAIL_EXISTS") {
                return res.status(409).json({ message: "Email already exists" });
            }
            next(err);
        }
    });
}

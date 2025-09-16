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
exports.removeLecturer = removeLecturer;
const lecturers_service_1 = require("../../services/lecturers.service");
function removeLecturer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const lecturerId = Number(id);
            if (!lecturerId || isNaN(lecturerId)) {
                return res.status(400).json({ message: "Invalid lecturer id" });
            }
            const deletedId = yield (0, lecturers_service_1.deleteLecturer)(lecturerId);
            return res.status(200).json({ id: id, message: "Lecturer deleted" });
        }
        catch (err) {
            next(err);
        }
    });
}

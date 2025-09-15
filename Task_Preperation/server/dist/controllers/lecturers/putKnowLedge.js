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
exports.putKnowledgeHandler = putKnowledgeHandler;
const domainMap_1 = require("./domainMap");
const lecturers_service_1 = require("../../services/lecturers.service");
const getLecturers_1 = require("./getLecturers");
function putKnowledgeHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const { domain, level } = req.body;
            // Basic Validation
            if (!id || id <= 0)
                return res.status(400).json({ message: "Invalid id" });
            if (!domain || !domainMap_1.DOMAIN_TO_COLUMN[domain])
                return res.status(400).json({ message: "Invalid domain" });
            // get Allowed Levels from DB
            const allowedLevels = yield (0, getLecturers_1.getLevels)();
            if (!level || !allowedLevels.includes(level)) {
                return res.status(400).json({ message: "Invalid level" });
            }
            //
            const levelId = yield (0, lecturers_service_1.getLevelIdByName)(level);
            if (levelId == null) {
                return res.status(400).json({ message: "Level not found in knowledgeLevel table" });
            }
            // 4) Update the value
            const column = domainMap_1.DOMAIN_TO_COLUMN[domain];
            const affected = yield (0, lecturers_service_1.updateLecturerKnowledgeById)(id, column, levelId);
            if (affected === 0)
                return res.status(404).json({ message: "Lecturer not found" });
            return res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    });
}

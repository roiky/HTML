import { Router } from "express";
import { getLecturersHandler, updateKnowledgeHandler } from "../controllers/lecturers.controller.js";

const r = Router();
r.get("/", getLecturersHandler);
r.put("/:id/knowledge", updateKnowledgeHandler);
export default r;

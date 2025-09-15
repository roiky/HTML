import { Request, Response, NextFunction } from "express";
import { getAllLecturers, updateKnowledgeById } from "../services/lecturers.service.js";
import { UpdateKnowledgeSchema } from "../utils/zodSchemas.js";

const columnMap: Record<string, string> = {
  "Full Stack Dev": "knowledge_fullstack",
  "AI Tools": "knowledge_ai_tools",
  "n8n": "knowledge_n8n",
  "MySQL": "knowledge_mysql",
  "MongoDB": "knowledge_mongodb",
  "Node.js": "knowledge_node",
  "Typescript": "knowledge_typescript"
};

export async function getLecturersHandler(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await getAllLecturers();
    res.json({ data });
  } catch (e) { next(e); }
}

export async function updateKnowledgeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const parsed = UpdateKnowledgeSchema.parse(req.body);
    const column = columnMap[parsed.domain];
    await updateKnowledgeById(id, column, parsed.level);
    res.status(204).send();
  } catch (e) { next(e); }
}

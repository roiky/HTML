import { z } from "zod";

export const UpdateKnowledgeSchema = z.object({
  domain: z.enum(["Full Stack Dev","AI Tools","n8n","MySQL","MongoDB","Node.js","Typescript"]),
  level: z.enum(["No knowledge","Low","Medium","Expert"])
});
export type UpdateKnowledgeDTO = z.infer<typeof UpdateKnowledgeSchema>;

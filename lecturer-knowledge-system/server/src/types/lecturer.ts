export type KnowledgeLevel = 'No knowledge' | 'Low' | 'Medium' | 'Expert';
export const DOMAINS = [
  "fullstack","ai_tools","n8n","mysql","mongodb","node","typescript",
] as const;
export type Domain = typeof DOMAINS[number];

export type Lecturer = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  course_count: number;
  email: string;
  created_at: string;
  knowledge_fullstack: KnowledgeLevel;
  knowledge_ai_tools: KnowledgeLevel;
  knowledge_n8n: KnowledgeLevel;
  knowledge_mysql: KnowledgeLevel;
  knowledge_mongodb: KnowledgeLevel;
  knowledge_node: KnowledgeLevel;
  knowledge_typescript: KnowledgeLevel;
}

import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const api = axios.create({ baseURL });

export type KnowledgeLevel = 'No knowledge' | 'Low' | 'Medium' | 'Expert';
export type DomainLabel = "Full Stack Dev"|"AI Tools"|"n8n"|"MySQL"|"MongoDB"|"Node.js"|"Typescript";

export async function fetchLecturers() {
  const { data } = await api.get("/lecturers");
  return data.data as any[];
}

export async function updateKnowledge(id: number, domain: DomainLabel, level: KnowledgeLevel) {
  await api.put(`/lecturers/${id}/knowledge`, { domain, level });
}

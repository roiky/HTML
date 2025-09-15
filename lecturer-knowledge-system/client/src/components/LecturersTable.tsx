import { useEffect, useState } from "react";
import { fetchLecturers, updateKnowledge, KnowledgeLevel, DomainLabel } from "../api/lecturers";

const LEVELS: KnowledgeLevel[] = ["No knowledge","Low","Medium","Expert"];

const domainColumns: { label: DomainLabel; field: string }[] = [
  { label: "Full Stack Dev", field: "knowledge_fullstack" },
  { label: "AI Tools",      field: "knowledge_ai_tools"  },
  { label: "n8n",           field: "knowledge_n8n"       },
  { label: "MySQL",         field: "knowledge_mysql"     },
  { label: "MongoDB",       field: "knowledge_mongodb"   },
  { label: "Node.js",       field: "knowledge_node"      },
  { label: "Typescript",    field: "knowledge_typescript"}
];

export default function LecturersTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<{[k:string]: boolean}>({}); // key: `${id}:${field}`

  async function load() {
    setLoading(true);
    try {
      const data = await fetchLecturers();
      setRows(data);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function onChangeLevel(id: number, domainLabel: DomainLabel, field: string, newLevel: KnowledgeLevel) {
    const key = `${id}:${field}`;
    setSaving(s => ({...s, [key]: true}));
    try {
      await updateKnowledge(id, domainLabel, newLevel);
      setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: newLevel } : r));
    } catch (e:any) {
      alert(e?.response?.data?.message ?? "Update failed");
    } finally {
      setSaving(s => ({...s, [key]: false}));
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div style={{overflowX:"auto"}}>
      <table style={{borderCollapse:"collapse", width:"100%"}}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Age</th><th># of Courses</th>
            {domainColumns.map(c => <th key={c.field}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.first_name} {r.last_name}</td>
              <td>{r.email}</td>
              <td>{r.age}</td>
              <td>{r.course_count}</td>
              {domainColumns.map((col) => {
                const key = `${r.id}:${col.field}`;
                const val: KnowledgeLevel = r[col.field] ?? "No knowledge";
                return (
                  <td key={col.field}>
                    <select
                      value={val}
                      disabled={!!saving[key]}
                      onChange={(e) => onChangeLevel(r.id, col.label, col.field, e.target.value as KnowledgeLevel)}
                    >
                      {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    {saving[key] && <span style={{marginInlineStart:8}}>⏳</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

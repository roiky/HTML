# Lecturer Knowledge Management System

Full-stack CRUD app to manage lecturers and their knowledge levels.

## Stack
- Frontend: React + TypeScript (Vite)
- Backend: Node.js + Express + TypeScript
- Database: MySQL (Docker)

## Quick start

1) **Prerequisites**: Docker & Docker Compose installed.

2) **Run all services**:
```bash
docker compose up --build
```

3) **Open the client**:
- http://localhost:5173

4) **API health check**:
```bash
curl http://localhost:3000/hc
```

### API
- `GET /lecturers` → list of lecturers
- `PUT /lecturers/:id/knowledge`
  - body: `{ "domain": "AI Tools", "level": "Expert" }`

### Notes
- `email` is **unique** in DB.
- `created_at` is automatic with `DEFAULT CURRENT_TIMESTAMP` (use `YYYY-MM-DD HH:MM:SS` format if you must insert manually).

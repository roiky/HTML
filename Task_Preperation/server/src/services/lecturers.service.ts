import getConnection from "../db";

export async function getLecturers() {
    const conn = await getConnection();
    const getLecturersDetails = `
        SELECT 
        l.id,
        l.first_name,
        l.last_name,
        l.age,
        l.course_count,
        l.email,
        kn.levelName AS n8n_level,
        kf.levelName AS fullstack_level,
        ka.levelName AS ai_level,
        km.levelName AS mysql_level,
        l.created_at
    FROM lecturer_management.lecturer l
    LEFT JOIN lecturer_management.knowledgeLevel kn 
        ON l.level_n8n = kn.levelID
    LEFT JOIN lecturer_management.knowledgeLevel kf 
        ON l.level_fullstack = kf.levelID
    LEFT JOIN lecturer_management.knowledgeLevel ka 
        ON l.level_AI = ka.levelID
    LEFT JOIN lecturer_management.knowledgeLevel km 
        ON l.level_MySQL = km.levelID;
    `;

    const [rows] = await conn.execute(getLecturersDetails, []);
    return rows;
}

export async function getLevels(): Promise<string[]> {
    const conn = await getConnection();
    const sql = `SELECT DISTINCT levelName FROM lecturer_management.knowledgeLevel`;
    const [rows]: any = await conn.execute(sql);
    return rows.map((r: any) => r.levelName);
}

export async function getLevelIdByName(levelName: string): Promise<number | null> {
    const conn = await getConnection();
    const [rows]: any = await conn.execute("SELECT levelID FROM lecturer_management.knowledgeLevel WHERE levelName = ?", [
        levelName,
    ]);
    return rows.length ? rows[0].levelID : null;
}

export async function updateLecturerKnowledgeById(
    id: number,
    column: string, // EXAMPLE: "level_AI"
    levelId: number // EXAMPLE: 3
) {
    const conn = await getConnection();
    const [res]: any = await conn.execute(`UPDATE lecturer_management.lecturer SET ${column} = ? WHERE id = ?`, [levelId, id]);
    return res.affectedRows as number;
}

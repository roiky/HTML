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

export type Level = {
    levelID: number;
    levelName: string;
};

export async function getLevels(): Promise<Level[]> {
    const conn = await getConnection();
    const sql = `SELECT levelID, levelName FROM lecturer_management.knowledgeLevel`;
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

export async function isEmailExists(email: string): Promise<boolean> {
    const conn = await getConnection();
    const sql = `SELECT COUNT(*) as count FROM lecturer_management.lecturer WHERE email = ?`;
    const [rows]: any = await conn.execute(sql, [email]);
    const count = rows[0]?.count ?? 0;
    return count > 0;
}

export async function createLecturer(payload: {
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    course_count: number;
}): Promise<number> {
    const conn = await getConnection();

    // אימייל ייחודי
    if (await isEmailExists(payload.email)) {
        const err: any = new Error("Email already exists");
        err.code = "EMAIL_EXISTS";
        throw err;
    }

    // כל הדומיינים יקבלו levelID = 1 ("No knowledge")
    const defaultLevelId = 1;

    const sql = `
    INSERT INTO lecturer_management.lecturer (
      first_name, last_name, age, course_count, email, created_at,
      level_n8n, level_fullstack, level_AI, level_MySQL
    )
    VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)
  `;

    const [res]: any = await conn.execute(sql, [
        payload.first_name,
        payload.last_name,
        payload.age,
        payload.course_count,
        payload.email,
        defaultLevelId,
        defaultLevelId,
        defaultLevelId,
        defaultLevelId,
    ]);

    return res.insertId as number;
}

export async function deleteLecturer(id: number): Promise<boolean> {
    const conn = await getConnection();
    const sql = `DELETE FROM lecturer_management.lecturer WHERE id = ?`;
    const [rows]: any = await conn.execute(sql, [id]);
    const count = rows[0]?.count ?? 0;
    return count > 0;
}

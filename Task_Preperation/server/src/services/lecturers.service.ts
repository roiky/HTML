import getConnection from "../db";

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

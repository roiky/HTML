import getConnection from "../db";

export type ReportRow = {
    vacation_id: number;
    destination: string;
    followers_count: number;
};

export async function getFollowersReport(): Promise<ReportRow[]> {
    try {
        const conn = await getConnection();
        const sql = `
      SELECT vacation_id, destination, followers_count
      FROM vacations_app.vw_vacations_with_followers
      ORDER BY followers_count DESC
    `;
        const [rows]: any = await conn.execute(sql);

        const mapped: ReportRow[] = (rows || []).map((r: any) => ({
            vacation_id: Number(r.vacation_id),
            destination: String(r.destination),
            followers_count: Number(r.followers_count ?? 0),
        }));

        return mapped;
    } catch (err) {
        console.error("[REPORTS] getFollowersReport error:", err);
        throw err;
    }
}

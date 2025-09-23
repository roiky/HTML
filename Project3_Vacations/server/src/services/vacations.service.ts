import getConnection from "../db";

export type VacationRow = {
    vacation_id: number;
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    image_name?: string | null;
    followers_count: number;
    is_following: 0 | 1;
};

type BaseArgs = {
    userId?: number | null;
    page?: number;
    pageSize?: number;
};

async function getVacationsBase(sqlParams: {
    whereClause?: string;
    whereParams?: any[];
    userId?: number | null;
    page?: number;
    pageSize?: number;
}): Promise<{ rows: VacationRow[]; total: number; page: number; pageSize: number }> {
    const page = Math.max(1, Number(sqlParams.page ?? 1));
    const pageSize = Math.max(1, Math.min(100, Number(sqlParams.pageSize ?? 10)));
    const offset = (page - 1) * pageSize;

    const whereSql = sqlParams.whereClause && sqlParams.whereClause.trim() ? `WHERE ${sqlParams.whereClause}` : "";
    const baseParams = Array.isArray(sqlParams.whereParams) ? [...sqlParams.whereParams] : [];

    const conn = await getConnection();

    // COUNT
    const countSql = `SELECT COUNT(*) AS cnt FROM vacations v ${whereSql}`;
    const [countRows]: any = await conn.execute(countSql, baseParams);
    const total = Number(countRows[0]?.cnt ?? 0);

    // safe user id (0 means "not following" for any real user id)
    const safeUserId = sqlParams.userId != null ? Number(sqlParams.userId) : 0;

    // SELECT (LIMIT/OFFSET inserted inline after validation)
    const selectSql = `
    SELECT
      v.vacation_id,
      v.destination,
      v.description,
      v.start_date,
      v.end_date,
      v.price,
      v.image_name,
      (SELECT COUNT(*) FROM followers f WHERE f.vacation_id = v.vacation_id) AS followers_count,
      EXISTS (SELECT 1 FROM followers f2 WHERE f2.vacation_id = v.vacation_id AND f2.user_id = ?) AS is_following
    FROM vacations v
    ${whereSql}
    ORDER BY v.start_date ASC
    LIMIT ${pageSize} OFFSET ${offset}
  `;

    const selectParams: any[] = [...baseParams, safeUserId];
    const [rows]: any = await conn.execute(selectSql, selectParams);

    const mapped: VacationRow[] = (rows || []).map((r: any) => ({
        vacation_id: r.vacation_id,
        destination: r.destination,
        description: r.description,
        start_date: r.start_date,
        end_date: r.end_date,
        price: Number(r.price),
        image_name: r.image_name,
        followers_count: Number(r.followers_count ?? 0),
        is_following: r.is_following ? 1 : 0,
    }));

    return { rows: mapped, total, page, pageSize };
}

/* ---------- exported convenient functions ---------- */

export async function getAllVacations(args: BaseArgs) {
    return getVacationsBase({ whereClause: "", whereParams: [], ...args });
}

export async function getActiveVacations(args: BaseArgs) {
    return getVacationsBase({
        whereClause: "v.start_date <= NOW() AND v.end_date >= NOW()",
        whereParams: [],
        ...args,
    });
}

export async function getUpcomingVacations(args: BaseArgs) {
    return getVacationsBase({
        whereClause: "v.start_date > NOW()",
        whereParams: [],
        ...args,
    });
}

export async function getFollowedVacations(args: BaseArgs & { userId?: number | null }) {
    if (!args.userId) {
        const err: any = new Error("userId is required for getFollowedVacations");
        err.code = "MISSING_USER";
        throw err;
    }
    return getVacationsBase({
        whereClause: "EXISTS (SELECT 1 FROM followers f2 WHERE f2.vacation_id = v.vacation_id AND f2.user_id = ?)",
        whereParams: [args.userId],
        ...args,
    });
}

export async function followVacation(userId: number, vacationId: number): Promise<void> {
    const conn = await getConnection();
    await conn.execute(`INSERT IGNORE INTO followers (user_id, vacation_id) VALUES (?, ?)`, [userId, vacationId]);
}

export async function unfollowVacation(userId: number, vacationId: number): Promise<void> {
    const conn = await getConnection();
    await conn.execute(`DELETE FROM followers WHERE user_id = ? AND vacation_id = ?`, [userId, vacationId]);
}

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
    const requestedPageSize = sqlParams.pageSize == null ? 10 : Number(sqlParams.pageSize);
    const noPagination = requestedPageSize <= 0;
    const pageSize = noPagination ? 0 : Math.max(1, Math.min(1000, requestedPageSize));
    const offset = (page - 1) * (pageSize || 0);

    const whereSql = sqlParams.whereClause && sqlParams.whereClause.trim() ? `WHERE ${sqlParams.whereClause}` : "";
    const baseParams = Array.isArray(sqlParams.whereParams) ? [...sqlParams.whereParams] : [];

    const conn = await getConnection();

    const countSql = `SELECT COUNT(*) AS cnt FROM vacations v ${whereSql}`;
    const [countRows]: any = await conn.execute(countSql, baseParams);
    const total = Number(countRows[0]?.cnt ?? 0);

    const safeUserId = sqlParams.userId != null ? Number(sqlParams.userId) : 0;

    const limitClause = noPagination ? "" : `LIMIT ${pageSize} OFFSET ${offset}`;

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
    ${limitClause}
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

    return {
        rows: mapped,
        total,
        page: noPagination ? 1 : page,
        pageSize: noPagination ? total : pageSize,
    };
}

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
        //err.code = "MISSING_USER";
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

/* ---------- ADMIN FUNCTIONS = CRUD  ---------- */

export async function createVacation(payload: {
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    image_name?: string | null;
}): Promise<number> {
    const conn = await getConnection();
    const sql = `
    INSERT INTO vacations_app.vacations
      (destination, description, start_date, end_date, price, image_name, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;
    const params = [
        payload.destination,
        payload.description,
        payload.start_date,
        payload.end_date,
        payload.price,
        payload.image_name ?? null,
    ];

    const [result]: any = await conn.execute(sql, params);
    return result.insertId as number;
}

export async function updateVacation(
    id: number,
    payload: {
        destination: string;
        description: string;
        start_date: string;
        end_date: string;
        price: number;
        image_name?: string | null;
    }
): Promise<boolean> {
    const conn = await getConnection();
    const sql = `
    UPDATE vacations_app.vacations
    SET destination = ?, description = ?, start_date = ?, end_date = ?, price = ?, image_name = ?
    WHERE vacation_id = ?
  `;
    const params = [
        payload.destination,
        payload.description,
        payload.start_date,
        payload.end_date,
        payload.price,
        payload.image_name ?? null,
        id,
    ];

    const [result]: any = await conn.execute(sql, params);
    return result.affectedRows > 0;
}

export async function deleteVacation(id: number): Promise<boolean> {
    const conn = await getConnection();
    const [result]: any = await conn.execute("DELETE FROM vacations_app.vacations WHERE vacation_id = ?", [id]);
    return result.affectedRows > 0;
}

export async function findVacationById(id: number) {
    const conn = await getConnection();
    const [rows]: any = await conn.execute("SELECT * FROM vacations_app.vacations WHERE vacation_id = ?", [id]);
    return rows && rows[0] ? rows[0] : null;
}

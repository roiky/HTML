import { Request, Response, NextFunction } from "express";
import { getFollowersReport, ReportRow } from "../services/reports.service";

export async function getFollowersJsonHandler(_req: Request, res: Response, next: NextFunction) {
    try {
        const data = await getFollowersReport();
        return res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/**
 * Escape value for CSV:
 * - double-quote the field,
 * - double any internal quotes,
 * - if null/undefined -> empty string.
 */
function escapeCsvValue(v: any): string {
    if (v === null || v === undefined) return "";
    const s = String(v);
    // replace " with "" then wrap in quotes
    return `"${s.replace(/"/g, '""')}"`;
}

/**
 * Build CSV content from ReportRow[].
 * First line = header, then rows.
 * We prepend BOM (\uFEFF) so Excel will detect UTF-8 correctly.
 */
function buildFollowersCsv(rows: ReportRow[]): string {
    const headers = ["vacation_id", "destination", "followers_count"];
    const headerLine = headers.join(",");
    const dataLines = rows.map((r) => [r.vacation_id, r.destination, r.followers_count].map(escapeCsvValue).join(","));
    const csv = [headerLine, ...dataLines].join("\r\n");
    // prepend BOM for Excel / Windows CSV compatibility
    return "\uFEFF" + csv;
}

/**
 * GET /reports/followers.csv
 * returns CSV file for download
 */
export async function getFollowersCsvHandler(_req: Request, res: Response, next: NextFunction) {
    try {
        const rows = await getFollowersReport(); // returns ReportRow[]
        const csvContent = buildFollowersCsv(rows);

        // Set headers so browser downloads a file
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader("Content-Disposition", 'attachment; filename="followers_report.csv"');

        return res.status(200).send(csvContent);
    } catch (err) {
        next(err);
    }
}

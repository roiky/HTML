import { Request, Response, NextFunction } from "express";
import { getFollowersReport } from "../services/reports.service";

export async function getFollowersJsonHandler(_req: Request, res: Response, next: NextFunction) {
    try {
        const data = await getFollowersReport();
        return res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

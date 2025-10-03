import { Request, Response, NextFunction } from "express";
import {
    getAllVacations,
    getActiveVacations,
    getUpcomingVacations,
    getFollowedVacations,
    followVacation,
    unfollowVacation,
} from "../services/vacations.service";

export async function getAllVacationsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page ?? 1);
        const pageSize = Number(req.query.pageSize ?? 10);
        const userId = (req as any).user?.userId ?? null;

        const result = await getAllVacations({ userId, page, pageSize });
        res.json({ data: result.rows, meta: { total: result.total, page: result.page, pageSize: result.pageSize } });
    } catch (err) {
        next(err);
    }
}

export async function getActiveVacationsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page ?? 1);
        const pageSize = Number(req.query.pageSize ?? 10);
        const userId = (req as any).user?.userId ?? null;

        const result = await getActiveVacations({ userId, page, pageSize });
        res.json({ data: result.rows, meta: { total: result.total, page: result.page, pageSize: result.pageSize } });
    } catch (err) {
        next(err);
    }
}

export async function getUpcomingVacationsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page ?? 1);
        const pageSize = Number(req.query.pageSize ?? 10);
        const userId = (req as any).user?.userId ?? null;

        const result = await getUpcomingVacations({ userId, page, pageSize });
        res.json({ data: result.rows, meta: { total: result.total, page: result.page, pageSize: result.pageSize } });
    } catch (err) {
        next(err);
    }
}

export async function getFollowedVacationsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page ?? 1);
        const pageSize = Number(req.query.pageSize ?? 10);
        const userId = (req as any).user?.userId;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const result = await getFollowedVacations({ userId, page, pageSize });
        res.json({ data: result.rows, meta: { total: result.total, page: result.page, pageSize: result.pageSize } });
    } catch (err) {
        next(err);
    }
}

export async function postFollowHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const vacationId = Number(req.params.id);
        if (!vacationId || Number.isNaN(vacationId) || vacationId <= 0) {
            return res.status(400).json({ message: "Invalid vacation id" });
        }

        await followVacation(userId, vacationId);

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

export async function deleteFollowHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const vacationId = Number(req.params.id);
        if (!vacationId || Number.isNaN(vacationId) || vacationId <= 0) {
            return res.status(400).json({ message: "Invalid vacation id" });
        }

        await unfollowVacation(userId, vacationId);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

export async function getAllVacationsAdminHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user?.userId ?? null;

        const result = await getAllVacations({ userId, pageSize: -1 });
        res.json({ data: result.rows, meta: { total: result.total, page: result.page, pageSize: result.pageSize } });
    } catch (err) {
        next(err);
    }
}

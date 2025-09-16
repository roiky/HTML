import { Request, Response, NextFunction } from "express";
import { deleteLecturer } from "../../services/lecturers.service";

export async function removeLecturer(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const lecturerId = Number(id);

        if (!lecturerId || isNaN(lecturerId)) {
            return res.status(400).json({ message: "Invalid lecturer id" });
        }

        const deletedId = await deleteLecturer(lecturerId);

        return res.status(200).json({ id: id, message: "Lecturer deleted" });
    } catch (err: any) {
        next(err);
    }
}

import { Request, Response, NextFunction } from "express";
import { createLecturer } from "../../services/lecturers.service";
import { CreateLecturerSchema } from "../../utils/zodSchemas";

export async function postNewLecturer(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = CreateLecturerSchema.parse(req.body);
        const { first_name, last_name, email, age, course_count } = parsed;

        const insertId = await createLecturer({
            first_name,
            last_name,
            email,
            age,
            course_count,
        });

        return res.status(201).json({ id: insertId, message: "Lecturer created" });
    } catch (err: any) {
        if (err?.name === "ZodError") {
            return res.status(400).json({ message: "Validation error", details: err.errors });
        }
        if (err?.code === "EMAIL_EXISTS") {
            return res.status(409).json({ message: "Email already exists" });
        }
        next(err);
    }
}

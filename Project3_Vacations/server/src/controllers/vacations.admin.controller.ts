import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";
import { vacationCreateSchema, vacationUpdateSchema } from "../utils/zodSchemas";
import { createVacation, updateVacation, deleteVacation, findVacationById } from "../services/vacations.service";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// POST /vacations  (multipart/form-data: fields + optional image file with key "image")
export async function postNewVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const file = (req as any).file;

        const payloadRaw = {
            destination: req.body.destination,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            price: Number(req.body.price),
        };

        // validate
        const parsed = vacationCreateSchema.safeParse(payloadRaw);
        if (!parsed.success) {
            if (file) await fs.unlink(path.join(UPLOAD_DIR, file.filename)).catch(() => {});
            return res.status(400).json({ message: "Validation error", details: parsed.error.format() });
        }

        // build final payload and include image_name explicitly
        const finalPayload = {
            ...parsed.data,
            image_name: file ? file.filename : null,
        };

        console.log("DEBUG: finalPayload =", finalPayload);

        const id = await createVacation(finalPayload);
        return res.status(201).json({ id, message: "Vacation created" });
    } catch (err) {
        next(err);
    }
}

// PUT /vacations/:id (multipart/form-data, image optional)
export async function putVacationHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid id" });

        const file = (req as any).file;
        const payload = {
            destination: req.body.destination,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            price: Number(req.body.price),
            image_name: file ? file.filename : undefined, // undefined means keep existing if not provided
        };

        const parsed = vacationUpdateSchema.safeParse({
            destination: payload.destination,
            description: payload.description,
            start_date: payload.start_date,
            end_date: payload.end_date,
            price: payload.price,
            image_name: payload.image_name ?? null,
        });

        if (!parsed.success) {
            if (file) await fs.unlink(path.join(UPLOAD_DIR, file.filename)).catch(() => {});
            return res.status(400).json({ message: "Validation error", details: parsed.error.format() });
        }

        if (Date.parse(parsed.data.end_date) < Date.parse(parsed.data.start_date)) {
            if (file) await fs.unlink(path.join(UPLOAD_DIR, file.filename)).catch(() => {});
            return res.status(400).json({ message: "end_date must be >= start_date" });
        }

        // get existing to possibly delete old image
        const existing = await findVacationById(id);
        if (!existing) {
            if (file) await fs.unlink(path.join(UPLOAD_DIR, file.filename)).catch(() => {});
            return res.status(404).json({ message: "Vacation not found" });
        }

        // if no new image was provided, keep old image_name
        const finalPayload = {
            ...parsed.data, // destination, description, start_date, end_date, price
            image_name: file ? file.filename : existing.image_name, // אם הגיעה תמונה חדשה — השתמש בה, אחרת השאר את הקיים
        };

        const ok = await updateVacation(id, finalPayload);
        if (!ok) {
            // cleanup uploaded file if update failed
            if (file) await fs.unlink(path.join(UPLOAD_DIR, file.filename)).catch(() => {});
            return res.status(500).json({ message: "Update failed" });
        }

        // if new image was provided and there was an old image — delete old file from disk
        if (file && existing.image_name) {
            await fs.unlink(path.join(UPLOAD_DIR, existing.image_name)).catch(() => {});
        }

        return res.status(200).json({ message: "Vacation updated" });
    } catch (err) {
        next(err);
    }
}

// DELETE /vacations/:id
export async function deleteVacationHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid id" });

        const existing = await findVacationById(id);
        if (!existing) return res.status(404).json({ message: "Vacation not found" });

        const ok = await deleteVacation(id);
        if (!ok) return res.status(500).json({ message: "Delete failed" });

        // delete image file if exists
        if (existing.image_name) {
            await fs.unlink(path.join(UPLOAD_DIR, existing.image_name)).catch(() => {});
        }

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

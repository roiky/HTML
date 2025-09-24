import { Router } from "express";
import { postNewVacation, putVacationHandler, deleteVacationHandler } from "../controllers/vacations.admin.controller";
import { uploadSingle } from "../middleware/upload.middleware";
import { requireAdmin /* or requireAuth then requireAdmin */ } from "../middleware/auth.middleware";

const router = Router();

// create: multipart/form-data with optional "image" file
router.post("/create", /* requireAdmin, */ uploadSingle.single("image"), postNewVacation);

// update: multipart/form-data, image optional
router.put("/:id", /* requireAdmin, */ uploadSingle.single("image"), putVacationHandler);

// delete
router.delete("/:id", /* requireAdmin, */ deleteVacationHandler);

export default router;

import { Router } from "express";
import { postNewVacation, putVacationHandler, deleteVacationHandler } from "../controllers/vacations.admin.controller";
import { uploadSingle } from "../middleware/upload.middleware"; // to upload image file!
import { requireAdmin /* or requireAuth then requireAdmin */ } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", requireAdmin, uploadSingle.single("image"), postNewVacation);

router.put("/:id", requireAdmin, uploadSingle.single("image"), putVacationHandler);

router.delete("/:id", requireAdmin, deleteVacationHandler);

export default router;

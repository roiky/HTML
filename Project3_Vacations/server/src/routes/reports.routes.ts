import { Router } from "express";
import { getFollowersJsonHandler } from "../controllers/reports.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();
router.get("/followers", /* requireAdmin, */ getFollowersJsonHandler);
export default router;

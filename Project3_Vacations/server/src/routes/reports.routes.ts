import { Router } from "express";
import { getFollowersCsvHandler, getFollowersJsonHandler } from "../controllers/reports.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();
router.get("/followers", /* requireAdmin, */ getFollowersJsonHandler);
router.get("/csv", /* requireAdmin, */ getFollowersCsvHandler);
export default router;

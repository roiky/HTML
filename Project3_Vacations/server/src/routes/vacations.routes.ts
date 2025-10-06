import { Router } from "express";
import {
    deleteFollowHandler,
    getActiveVacationsHandler,
    getAllVacationsAdminHandler,
    getAllVacationsHandler,
    getFollowedVacationsHandler,
    getUpcomingVacationsHandler,
    postFollowHandler,
} from "../controllers/vacations.controller";
import { requireAdmin, requireAuth } from "../middleware/auth.middleware";

const router = Router();
//router.get("/test", testAuth);

router.get("/all", getAllVacationsHandler);
router.get("/active", getActiveVacationsHandler);
router.get("/upcoming", getUpcomingVacationsHandler);
router.get("/followed", requireAuth, getFollowedVacationsHandler);
router.get("/admin", requireAdmin, getAllVacationsAdminHandler);

router.post("/:id/follow", requireAuth, postFollowHandler);
router.delete("/:id/follow", requireAuth, deleteFollowHandler);

export default router;

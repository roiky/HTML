import { Router } from "express";
import {
    deleteFollowHandler,
    getActiveVacationsHandler,
    getAllVacationsHandler,
    getFollowedVacationsHandler,
    getUpcomingVacationsHandler,
    postFollowHandler,
} from "../controllers/vacations.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
//router.get("/test", testAuth);

router.get("/all", getAllVacationsHandler);
router.get("/active", getActiveVacationsHandler);
router.get("/upcoming", getUpcomingVacationsHandler);
router.get("/followed", requireAuth, getFollowedVacationsHandler); // requires auth

router.post("/:id/follow", postFollowHandler);
router.delete("/:id/follow", deleteFollowHandler);
//router.delete("/:id/follow", requireAuth, deleteFollowHandler);

export default router;

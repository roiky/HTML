import { Router } from "express";
import { registerHandler, loginHandler, setAdminHandler, getMeHandler } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
//router.get("/test", testAuth);

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.put("/setAdmin/:id", setAdminHandler); //needs to be admin but then no-one can set the first admin so for testing - no "requireAdmin" middleware
router.get("/me", requireAuth, getMeHandler); //return all the deatils based on the provided token

export default router;

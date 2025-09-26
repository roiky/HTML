import { Router } from "express";
import { registerHandler, loginHandler, setAdminHandler } from "../controllers/auth.controller";

const router = Router();
//router.get("/test", testAuth);

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.put("/setAdmin/:id", setAdminHandler); //needs to be admin but then no-one can set the first admin so for testing - no "requireAdmin" middleware

export default router;

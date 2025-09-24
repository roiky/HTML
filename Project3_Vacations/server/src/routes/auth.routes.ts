import { Router } from "express";
import { registerHandler, loginHandler, setAdminHandler } from "../controllers/auth.controller";

const router = Router();
//router.get("/test", testAuth);

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.put("/setAdmin/:id", setAdminHandler);

export default router;

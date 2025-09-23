import { Router } from "express";
import { registerHandler, loginHandler, testAuth } from "../controllers/auth.controller";

const router = Router();
//router.get("/test", testAuth);

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;

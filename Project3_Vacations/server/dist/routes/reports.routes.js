"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reports_controller_1 = require("../controllers/reports.controller");
const router = (0, express_1.Router)();
router.get("/followers", /* requireAdmin, */ reports_controller_1.getFollowersJsonHandler);
router.get("/csv", /* requireAdmin, */ reports_controller_1.getFollowersCsvHandler);
exports.default = router;

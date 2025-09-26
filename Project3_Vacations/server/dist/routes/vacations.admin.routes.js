"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacations_admin_controller_1 = require("../controllers/vacations.admin.controller");
const upload_middleware_1 = require("../middleware/upload.middleware"); // to upload image file!
const router = (0, express_1.Router)();
// create: multipart/form-data with optional "image" file
router.post("/create", /* requireAdmin, */ upload_middleware_1.uploadSingle.single("image"), vacations_admin_controller_1.postNewVacation);
// update: multipart/form-data, image optional
router.put("/:id", /* requireAdmin, */ upload_middleware_1.uploadSingle.single("image"), vacations_admin_controller_1.putVacationHandler);
// delete
router.delete("/:id", /* requireAdmin, */ vacations_admin_controller_1.deleteVacationHandler);
exports.default = router;

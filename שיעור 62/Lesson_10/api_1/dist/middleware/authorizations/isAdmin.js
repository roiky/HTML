"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminMiddleware = void 0;
const isAdminMiddleware = (req, res, next) => {
    var _a;
    const role = (_a = req === null || req === void 0 ? void 0 : req.userData) === null || _a === void 0 ? void 0 : _a.role;
    if (role !== "admin")
        return res.status(403).send("error");
    else
        return next();
};
exports.isAdminMiddleware = isAdminMiddleware;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAutMiddleware = void 0;
const validateAutMiddleware = (roles) => {
    return (req, res, next) => {
        var _a, _b;
        if ((_a = req.userData) === null || _a === void 0 ? void 0 : _a.isAdmin)
            return next();
        const role = (_b = req === null || req === void 0 ? void 0 : req.userData) === null || _b === void 0 ? void 0 : _b.role;
        if (Array.isArray(roles) && roles.includes(role))
            return next();
        else
            return res.status(403).send("error");
    };
};
exports.validateAutMiddleware = validateAutMiddleware;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logDuration;
function logDuration(req, res, next) {
    const startTime = Date.now();
    res.on("finish", () => {
        console.log(`[${req.url} Duration]: ${Date.now() - startTime}ms`);
    });
    next();
}

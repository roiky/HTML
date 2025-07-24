"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkApiKey;
function checkApiKey(req, res, next) {
    const apiKeyFromQuery = req.query.apiKey;
    const validApiKey = process.env.TOKEN;
    if (apiKeyFromQuery === validApiKey) {
        return next();
    }
    else {
        return next(new Error("WRONG-TOKEN"));
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, "First name is required"),
    last_name: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(4, "Password must be at least 4 characters"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password required"),
});

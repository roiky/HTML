"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vacationUpdateSchema = exports.vacationCreateSchema = exports.loginSchema = exports.registerSchema = void 0;
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
const isoDateString = zod_1.z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "Invalid date format, expected ISO string",
});
exports.vacationCreateSchema = zod_1.z.object({
    destination: zod_1.z.string().min(1, "destination is required"),
    description: zod_1.z.string().min(1, "description is required"),
    start_date: isoDateString,
    end_date: isoDateString,
    price: zod_1.z.number().min(0).max(10000),
});
exports.vacationUpdateSchema = exports.vacationCreateSchema;

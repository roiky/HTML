"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLecturerSchema = void 0;
const zod_1 = require("zod");
exports.CreateLecturerSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, "first_name is required"),
    last_name: zod_1.z.string().min(1, "last_name is required"),
    email: zod_1.z.string().email("Invalid email"),
    age: zod_1.z.number().int().min(0, "age must be non-negative"),
    course_count: zod_1.z.number().int().min(0, "course_count must be non-negative"),
});
